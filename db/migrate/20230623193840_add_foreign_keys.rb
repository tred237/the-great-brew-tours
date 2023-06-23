class AddForeignKeys < ActiveRecord::Migration[7.0]
  def change
    add_reference :brewery_reviews, :user, foreign_key: true, null: false
    add_reference :brewery_reviews, :brewery, foreign_key: true, null: false
    add_reference :breweries, :creator, foreign_key: { to_table: :users }, null: false
    add_reference :tours, :creator, foreign_key: { to_table: :users }, null: false
  end
end
