class SingleBrewerySerializer < ActiveModel::Serializer
  attributes :id, :name, :website, :address, :city, :postal_code

  has_many :brewery_reviews do
    self.object.brewery_reviews.order(id: :desc)
  end
end
