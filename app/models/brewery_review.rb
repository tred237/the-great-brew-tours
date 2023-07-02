class BreweryReview < ApplicationRecord
    belongs_to :user
    belongs_to :brewery

    validates :is_recommended, inclusion: [true, false]
    validates :review, presence: true, length: { in: 3..1000}
    validates :is_edited, inclusion: [true, false]
end
