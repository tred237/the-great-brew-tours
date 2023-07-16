class ScheduledTour < ApplicationRecord
    belongs_to :user
    belongs_to :tour

    validates :number_of_people, numericality: { greater_than: 0 }
    validates :tour_id, presence: true
    validate :tour_slot_upper_bound, :tour_already_scheduled, :scheduled_on_date

    def tour_slot_upper_bound
        scheduled_tour_agg = ScheduledTour.where("tour_id = #{tour_id}").sum(:number_of_people)
        tour_slots = Tour.find(tour_id).available_slots
        unless scheduled_tour_agg + number_of_people <= tour_slots
            errors.add(:number_of_people, "exceeds tour slot availability")
        end
    end

    def tour_already_scheduled
        unless !ScheduledTour.find_by(user_id: user_id, tour_id: tour_id)
            errors.add(:tour_already_scheduled, "tour already scheduled")
        end
    end
    
    def scheduled_on_date
        unless !User.find(user_id).tours.find{|t| t.tour_date.to_date == tour.tour_date.to_date}
            errors.add(:another_tour_scheduled_on_date, "another tour scheduled on date")
        end
    end
end
