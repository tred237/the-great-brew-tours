class BreweryReviewSerializer < ActiveModel::Serializer
  attributes :id, :is_recommended, :review, :is_edited, :created_at
end
