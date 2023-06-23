class CreateTourBreweries < ActiveRecord::Migration[7.0]
  def change
    create_table :tour_breweries do |t|
      t.timestamps
    end
  end
end
