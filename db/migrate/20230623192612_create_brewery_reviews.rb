class CreateBreweryReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :brewery_reviews do |t|
      t.boolean :is_recommended, null: false
      t.string :review, null: false
      t.boolean :is_edited, null: false, default: false
      t.timestamps
    end
  end
end
