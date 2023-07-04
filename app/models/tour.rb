class Tour < ApplicationRecord
    has_many :scheduled_tours, dependent: :destroy
    has_many :tour_breweries, dependent: :destroy
    has_many :breweries, through: :tour_breweries
    belongs_to :creator, foreign_key: 'creator_id', class_name: 'User'

    validates :tour_date, presence: true
    validates :duration, presence: true, numericality: { only_numeric: true }
    validates :meeting_location, presence: true
    validates :available_slots, presence: true, numericality: { only_integer: true }
    validates :creator_id, presence: true, inclusion: User.where(is_admin: true).map{|u| u.id}
end
