require 'digest'

pw = Digest::SHA1.hexdigest("#{Time.now.to_s}fcVjUAy82Mac1xDM")[0,16]

admin = User.new
admin.email = 'me@cobytamayo.com'
admin.password = pw
admin.password_confirmation = pw
admin.role = 'admin'
admin.save!

puts "GENERATED ADMIN LOGIN: #{admin.email} / #{pw}"
