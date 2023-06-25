class User < ApplicationRecord
    has_secure_password
    
    has_many :brewery_reviews
    has_many :scheduled_tours
    has_many :created_breweries, foreign_key: 'creator_id', class_name: 'Brewery'
    has_many :created_tours, foreign_key: 'creator_id', class_name: 'Tour'
end
