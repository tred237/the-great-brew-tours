class CreateScheduledTours < ActiveRecord::Migration[7.0]
  def change
    create_table :scheduled_tours do |t|
      t.integer :number_of_people, null: false
      t.timestamps
    end
  end
end
