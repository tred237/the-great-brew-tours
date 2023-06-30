class RemoveAgeAddBirthDate < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :age, :float
    add_column :users, :birth_date, :date
    change_column_null :users, :birth_date, false
  end
end
