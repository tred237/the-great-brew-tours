require 'byebug'


# Admin User
User.create!(username: 'admin', password: 'T3ster!', password_confirmation: "T3ster!", email: "admin@email.com", age: 21, is_admin: true) # admin account
puts "Admin created..."

# Create Breweries
parsed_brewery_data = JSON.parse(File.read('db/assets/brewery_data.json')).filter{|e| e["city"] && e['name']}
parsed_brewery_data.map do |b|
    Brewery.create!(name: b["name"], city: b["city"], website: b["website"], address: b["address_1"], postal_code: b["postal_code"], latitude: b["latitude"], logitude: b["logitude"], creator_id: User.find(1).id)
end
puts "Breweries created..."