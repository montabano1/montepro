class ChangeIndexBookings < ActiveRecord::Migration[5.2]
  def change
    remove_index :bookings, name: "index_bookings_on_club_id"
    add_index :bookings, :court_num
  end
end
