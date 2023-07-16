class ScheduledTourSerializer < ActiveModel::Serializer
  attributes :id, :tour_id, :number_of_people

  belongs_to :tour
end
