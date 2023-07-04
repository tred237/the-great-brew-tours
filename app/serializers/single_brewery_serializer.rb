class SingleBrewerySerializer < ActiveModel::Serializer
  attributes :id, :name, :website, :address, :city, :postal_code

  has_many :brewery_reviews
end
