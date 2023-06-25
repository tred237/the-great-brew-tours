class Brewery < ApplicationRecord
    has_many :brewery_reviews
    has_many :tour_breweries
    has_many :tours, through: :brewery_reviews
    belongs_to :creator, foreign_key: 'creator_id', class_name: 'User'
end
