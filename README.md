# Rails Skeletons

Explicit, granular, file-level overrides for [rails-app-templates](https://github.com/acobster/rails-app-templates).

## How it works

This codebase doesn't actually do anything. It's just a place for custom app-template code to look for specific files to override when generating a new Rails app.

## Usage

Best when integrated with [rails-app-templates](https://github.com/acobster/rails-app-templates).

```ruby
require_relative 'util/app_template_helper.rb'

overwrite_with_skeleton = prompt_for_skeleton

after_bundle do
  overwrite_with_skeleton.call unless overwrite_with_skeleton.nil?
end
```