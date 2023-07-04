class BreweryReviewSerializer < ActiveModel::Serializer
  attributes :id, :is_recommended, :review, :is_edited, :created_at, :user_id, :review_username

  def review_username
    User.find(self.object.user_id).username
  end
end
