# Rails Skeletons

Explicit, granular, file-level overrides for Rails app templates.

## How it works

This codebase doesn't actually do anything. It's just a place for custom app-template code to look for specific files to override when generating a new Rails app.

If you're curious about what the consuming code looks like, it's something like this (NOTE: yes, it's pretty terrible, but it works):

```ruby
require 'dotenv'

# ...

def prompt_for_skeleton()
  unless (skeleton = ask('use skeleton files? (enter to skip)')).blank?
    Dotenv.load(File.expand_path('.skeletons', Dir.home))

    unless Dir.exist?(ENV['SKELETONS_PATH'])
      puts 'no valid SKELETONS_PATH set, skipping skeletons...'
      return
    end

    skeleton_root = File.expand_path(skeleton, ENV['SKELETONS_PATH'])

    until Dir.exist?(skeleton_root) or skeleton.empty?
      puts "#{skeleton_root} not found."
      skeleton = ask('Try again? (enter to skip)')
      skeleton_root = File.expand_path(skeleton, ENV['SKELETONS_PATH'])
    end

    cwd = Dir.getwd

    # Get the list of removals to process
    removals = []
    removals_filepath = File.expand_path('.remove', skeleton_root)
    if File.file?(removals_filepath)
      removals = File.readlines(removals_filepath).
        map(&:strip).
        reject(&:empty?)
    end

    # Get the list of skeleton files to ignore
    ignores = []
    ignores_filepath = File.expand_path('.skeltonignore', skeleton_root)
    if File.file?(ignores_filepath)
      ignores = File.readlines(ignores_filepath).
        map(&:strip).
        reject(&:empty?)
    end

    Proc.new do
      puts '      placing files from '+skeleton_root
      # Recurse normally through the project tree
      # exclude the removals file and any ignored files
      Dir.glob(skeleton_root+'/**/*.*').reject do |filepath|
        filepath == removals_filepath or ignores.include?(filepath)
      end.each do |filepath|
        project_filepath = filepath.sub(skeleton_root, cwd)

        # copy the skeleton file into the project tree
        run "cp #{filepath} #{project_filepath}"
      end

      # Process removals
      removals.each do |pattern|
        Dir.glob(cwd+'/'+pattern).each do |filepath|
          remove_file(filepath)
        end
      end
    end
  end
end

_copy_skeleton = prompt_for_skeleton()

after_bundle do
  _copy_skeleton.call unless _copy_skeleton.nil?
end
```
