class AddTimestampsBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :created_at, :datetime, null: false
    add_column :bookings, :updated_at, :datetime, null: false
  end
end
