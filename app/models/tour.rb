class Tour < ApplicationRecord
    has_many :scheduled_tours
    has_many :tour_breweries
    has_many :breweries, through: :tour_breweries
    belongs_to :creator, foreign_key: 'creator_id', class_name: 'User'
end
