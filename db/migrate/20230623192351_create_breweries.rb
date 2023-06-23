class CreateBreweries < ActiveRecord::Migration[7.0]
  def change
    create_table :breweries do |t|
      t.string :name, null: false
      t.string :website
      t.string :address
      t.string :city, null: false
      t.string :postal_code
      t.timestamps
    end
  end
end
