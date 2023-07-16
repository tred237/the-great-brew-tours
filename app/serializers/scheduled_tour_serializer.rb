class ScheduledTourSerializer < ActiveModel::Serializer
  attributes :id, :tour_id, :number_of_people, :tour_breweries, :taken_slots

  def tour_breweries
    self.object.tour.breweries.pluck(:name)
  end

  def taken_slots
    self.object.tour.scheduled_tours.sum(:number_of_people)
  end

  belongs_to :tour
end
