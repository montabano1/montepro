class DeleteTitleBooking < ActiveRecord::Migration[5.2]
  def change
    remove_column :bookings, :title, :string
  end
end
