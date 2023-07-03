class ScheduledTour < ApplicationRecord
    belongs_to :user
    belongs_to :tour

    validates :number_of_people, numericality: { greater_than: 0 }
    validates :tour_id, presence: true
    validate :tour_slot_upper_bound

    def tour_slot_upper_bound
        scheduled_tour_agg = ScheduledTour.where("tour_id = #{tour_id}").sum(:number_of_people)
        tour_slots = Tour.find(tour_id).available_slots
        unless scheduled_tour_agg + number_of_people <= tour_slots
            errors.add(:number_of_people, "exceeds tour slot availability")
        end
    end
end
