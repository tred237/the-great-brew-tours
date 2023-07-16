class TourSerializer < ActiveModel::Serializer
  attributes :id, :tour_date, :duration, :meeting_location, :available_slots

  has_many :taken_slots do
    object.scheduled_tours.sum(:number_of_people)
  end

  has_many :breweries, through: :tour_breweries do
    object.breweries.map{ |b| {"brewery_id": b.id, "brewery_name": b.name} }
  end
end
