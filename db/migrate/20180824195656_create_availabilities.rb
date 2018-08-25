class CreateAvailabilities < ActiveRecord::Migration[5.2]
  def change
    create_table :availabilities do |t|
      t.integer :pro_id, null:false
      t.string :day, null:false
      t.integer :start_time, null:false
      t.integer :end_time, null:false
    end
    add_index :availabilities, :pro_id
  end
end
