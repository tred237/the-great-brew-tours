class TourBrewery < ApplicationRecord
    belongs_to :brewery
    belongs_to :tour
end
