class AddTitleToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :title, :string, null:false
  end
end
