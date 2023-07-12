require 'byebug'

# Admin User
User.create!(username: 'admin', password: 'T3ster!', password_confirmation: "T3ster!", email: "admin@email.com", birth_date: '1990-01-01', is_admin: true) # admin account
puts "Admin created..."

# Create Breweries
parsed_brewery_data = JSON.parse(File.read('db/assets/brewery_data.json')).filter{|e| e["city"] && e['name']}
parsed_brewery_data.map do |b|
    Brewery.create!(name: b["name"], city: b["city"], website: b["website"], address: b["address_1"], postal_code: b["postal_code"], latitude: b["latitude"], longitude: b["longitude"], creator_id: User.find(1).id)
end
puts "Breweries created..."

# Create Non-Admin Users
(1..20).each do |u|
    username = ''
    until username != '' and !User.all.map{|u| u["username"]}.include? username
        username = "#{Faker::Name.first_name} #{Faker::Name.last_name}"
    end
    User.create!(username: username, password: 'T3stUser!', password_confirmation: 'T3stUser!', birth_date: "#{rand(1950...2001)}-#{rand(1..12)}-#{rand(1..28)}", email: "#{username.downcase.gsub!(' ', '.')}@email.com")
end
puts "Non-admin users created..."

# Create Brewery Reviews
(1..1000).each do |r|
    BreweryReview.create!(user_id: rand(2..User.all.count), 
                        brewery_id: rand(1..Brewery.all.count), 
                        is_recommended: [true, true, false].sample, 
                        review: Faker::Lorem.sentence(word_count: rand(3..25), random_words_to_add: 0), 
                        is_edited: [true, false, false, false, false].sample)
end
puts "Brewery reviews created..."

# Create Tours
(1..20).each do |t|
    Tour.create!(tour_date: "#{Faker::Date.between(from: DateTime.now, to: DateTime.now + 60)} #{rand(8..15)}:#{[00, 15, 30, 45].sample}:00", 
                duration: "#{rand(4..8).to_s}.#{[0,25,50,75].sample}",
                meeting_location: "Union Station, Denver", 
                available_slots: rand(4..10), 
                creator_id: User.find(1).id)
end
puts "Tours created..."

# Create Tour Breweries
(1..20).each do |b|
    breweries = rand(3..5)
    brewery_list = []
    until brewery_list.length == breweries
        brewery = rand(1..Brewery.all.count)
        brewery_list.push(brewery) unless brewery_list.include? brewery
    end
    brewery_list.map{ |i| TourBrewery.create!(brewery_id: i, tour_id: b) }
end
puts "Tour breweries created..."

# Create Scheduled Tours
(1..40).each do |t|
    user_id = rand(2..User.all.count)
    tour_id = rand(1..20)
    tour = Tour.find(tour_id)
    slots_filled = tour.scheduled_tours.reduce(0){|pv, cv| pv + cv.number_of_people}
    if slots_filled < tour.available_slots and !tour.scheduled_tours.map{|i| i["user_id"]}.include? user_id 
        ScheduledTour.create!(user_id: user_id, tour_id: tour_id, number_of_people: rand(1..(tour.available_slots - slots_filled)))
    end
end
puts "Scheduled tours created..."

# byebug
# 0