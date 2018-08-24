class EditBookingTime < ActiveRecord::Migration[5.2]
  def change
    remove_column :bookings, :time, :time
    add_column :bookings, :start_time, :time 
    add_column :bookings, :end_time, :time
  end
end
