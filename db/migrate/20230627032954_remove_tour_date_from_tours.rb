class RemoveTourDateFromTours < ActiveRecord::Migration[7.0]
  def change
    remove_column :tours, :time_to_meet, :time
    change_column :tours, :tour_date, :datetime
  end
end
