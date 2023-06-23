class CreateTours < ActiveRecord::Migration[7.0]
  def change
    create_table :tours do |t|
      t.date :tour_date, null: false
      t.time :time_to_meet, null: false
      t.float :duration, null: false
      t.string :meeting_location, null: false
      t.integer :available_slots, null: false
      t.timestamps
    end
  end
end
