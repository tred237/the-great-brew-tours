class ScheduledTour < ApplicationRecord
    belongs_to :user
    belongs_to :tour

    validates :number_of_people, numericality: { greater_than: 0 }
    validates :tour_id, presence: true
    validate :tour_slot_upper_bound
    validate :tour_already_scheduled
    validate :scheduled_on_date

    def tour_slot_upper_bound
        if new_record?
            scheduled_tour_agg = ScheduledTour.where("tour_id = #{tour_id}").sum(:number_of_people)
        else 
            scheduled_tour_agg = ScheduledTour.where("tour_id = #{tour_id} and id != #{id}").sum(:number_of_people)
        end
        tour_slots = Tour.find(tour_id).available_slots
        unless scheduled_tour_agg + number_of_people <= tour_slots
            errors.add(:number_of_people, "exceeds tour slot availability")
        end
    end

    def tour_already_scheduled
        if new_record? and ScheduledTour.find_by(user_id: user_id, tour_id: tour_id)
            errors.add(:tour_already_scheduled, "tour already scheduled")
        end
    end
    
    def scheduled_on_date
        if new_record? and User.find(user_id).tours.find{|t| t.tour_date.to_date == tour.tour_date.to_date}
            errors.add(:another_tour_scheduled_on_date, "another tour scheduled on date")
        end
    end
end
