class BreweryReview < ApplicationRecord
    belongs_to :user
    belongs_to :brewery
end
