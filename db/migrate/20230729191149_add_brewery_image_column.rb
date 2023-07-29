class AddBreweryImageColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :breweries, :image, :string
    change_column_null :breweries, :image, false
  end
end
