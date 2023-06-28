class Tour < ApplicationRecord
    has_many :scheduled_tours
    has_many :tour_breweries
    has_many :breweries, through: :tour_breweries
    belongs_to :creator, foreign_key: 'creator_id', class_name: 'User'

    validates :tours, presence: true
    validates :duration, presence: true
    validates :meeting_location, presence: true
    validates :available_slots, presence: true
    validates :creator_id, presence: true, inclusion: User.where(is_admin: true).map{|u| u.id}
end
