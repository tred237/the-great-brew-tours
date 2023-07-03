class TourBrewery < ApplicationRecord
    belongs_to :brewery
    belongs_to :tour

    validate :one_brewery_per_tour

    def one_brewery_per_tour
        if TourBrewery.find_by(tour_id: tour_id, brewery_id: brewery_id)
            errors.add(:tour_brewery_combo, "must be unique")
        end
    end
end
