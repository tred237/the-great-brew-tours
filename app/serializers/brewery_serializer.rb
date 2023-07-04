class BrewerySerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :postal_code
end
