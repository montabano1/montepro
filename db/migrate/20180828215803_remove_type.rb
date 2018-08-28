class RemoveType < ActiveRecord::Migration[5.2]
  def change
    remove_column :bookings, :type, :string
    add_column :bookings, :event_type, :string 

  end
end
