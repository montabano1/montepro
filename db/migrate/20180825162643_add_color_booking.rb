class AddColorBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :color, :string
  end
end
