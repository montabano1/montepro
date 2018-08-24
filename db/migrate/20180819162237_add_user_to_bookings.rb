class AddUserToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :booked_by_id, :integer, null:false
    add_index :bookings, :booked_by_id
  end
end
