class RenameLongitudeColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :breweries, :logitude, :longitude
  end
end
