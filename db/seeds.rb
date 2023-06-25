require 'byebug'


# brewery_data_raw = File.read("./assets/brewery_data.json")
User.create!(username: 'admin', password: 'T3ster!', password_confirmation: "T3ster!", email: "admin@email.com", age: 21, is_admin: true) # admin account
# parsed_brewery_data = JSON.parse(File.read('db/assets/brewery_data.json')).filter{|e| e["city"] && e['name']}
# byebug
# 0