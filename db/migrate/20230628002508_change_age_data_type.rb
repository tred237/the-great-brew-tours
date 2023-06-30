class ChangeAgeDataType < ActiveRecord::Migration[7.0]
  def change
    reversible do |direction|
      change_table :users do |t|
        direction.up { t.change :age, :float }
        direction.down { t.change :age, :integer }
      end
    end
  end
end
