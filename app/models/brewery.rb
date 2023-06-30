class Brewery < ApplicationRecord
    has_many :brewery_reviews, dependent: :destroy
    has_many :tour_breweries, dependent: :destroy
    has_many :tours, through: :brewery_reviews
    belongs_to :creator, foreign_key: 'creator_id', class_name: 'User'

    validates :name, presence: true, uniqueness: true
    validate :website_uniqueness
    validates :city, presence: true
    validates :creator_id, presence: true, inclusion: User.where(is_admin: true).map{|u| u.id}

    def website_uniqueness
        unless !website or !Brewery.all.map{ |b| b.website}.include? website
            errors.add(:website, "Website has already been taken")
        end
    end
end
