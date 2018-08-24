class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.date :date, null:false
      t.time :time, null:false
      t.integer :club_id, null:false
      t.integer :court_num, null:false
    end
    add_index :bookings, :club_id
    add_index :bookings, :date
  end
end
