class Tour < ApplicationRecord
    has_many :scheduled_tours, dependent: :destroy
    has_many :tour_breweries, dependent: :destroy
    has_many :breweries, through: :tour_breweries
    belongs_to :creator, foreign_key: 'creator_id', class_name: 'User'

    validates :tour_date, presence: true
    validates :duration, presence: true, numericality: { only_numeric: true }
    validates :meeting_location, presence: true
    validates :available_slots, presence: true, numericality: { only_integer: true, greater_than: 0 }
    validates :creator_id, presence: true, inclusion: User.where(is_admin: true).map{|u| u.id}
    validate :tour_date_after_current_date

    def tour_date_after_current_date
        # byebug
        current_date = DateTime.now.in_time_zone('US/Mountain')
        current_year = current_date.year.to_s
        current_month = current_date.month < 10 ? "0#{current_date.month.to_s}" : current_date.month.to_s
        current_day = current_date.day < 10 ? "0#{current_date.day.to_s}" : current_date.day.to_s

        tour_year = tour_date.year.to_s
        tour_month = tour_date.month < 10 ? "0#{tour_date.month.to_s}" : tour_date.month.to_s
        tour_day = tour_date.day < 10 ? "0#{tour_date.day.to_s}" : tour_date.day.to_s

        unless tour_date and (tour_year + tour_month + tour_day).to_i > (current_year + current_month + current_day).to_i
        # unless tour_date and tour_date.to_date > Date.today.in_time_zone('US/Mountain').to_date #Date.today
            errors.add(:tour_date, "must occur after current date")
        end
    end
end
