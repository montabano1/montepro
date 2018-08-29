class AddProBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :pro_id, :integer
  end
end
