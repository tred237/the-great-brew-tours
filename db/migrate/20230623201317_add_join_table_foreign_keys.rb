class AddJoinTableForeignKeys < ActiveRecord::Migration[7.0]
  def change
    add_reference :tour_breweries, :tour, foreign_key: true, null: false
    add_reference :tour_breweries, :brewery, foreign_key: true, null: false
    add_reference :scheduled_tours, :tour, foreign_key: true, null: false
    add_reference :scheduled_tours, :user, foreign_key: true, null: false
  end
end
