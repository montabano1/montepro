class AddUniqueBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :time, :integer
    remove_column :bookings, :start_time, :integer
    remove_column :bookings, :end_time, :integer
    add_index :bookings, [:time, :date, :court_num], :unique => true
  end
end
