class ChangeAgeDataType < ActiveRecord::Migration[7.0]
  def up
    change_table :users do |t|
      t.change :age, :float
    end
  end

  def down
    change_table :users do |t|
      t.change :age, :integer
    end
  end
end
