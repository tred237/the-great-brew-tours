require 'byebug'
class User < ApplicationRecord
    has_secure_password
    
    has_many :brewery_reviews
    has_many :scheduled_tours
    has_many :created_breweries, foreign_key: 'creator_id', class_name: 'Brewery'
    has_many :created_tours, foreign_key: 'creator_id', class_name: 'Tour'

    password_requirements = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])/
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, confirmation: true, length: {in: 6..20}, format: {with: password_requirements, message: "format invalid"}
    validates :password_confirmation, presence: true
    validates :birth_date, presence: true
    validate :must_be_twenty_one

    def must_be_twenty_one
        unless birth_date.to_date <= Time.now.years_ago(21).to_date
            errors.add(:birth_date, "Must be 21 years of ago or older")
        end
    end
end
