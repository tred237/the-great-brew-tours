class ChangeAgeDataType < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :age, :float
  end
end
