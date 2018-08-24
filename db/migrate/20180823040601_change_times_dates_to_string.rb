class ChangeTimesDatesToString < ActiveRecord::Migration[5.2]
  def change
    remove_column :bookings, :date, :date
    add_column :bookings, :date, :string, null:false
    remove_column :bookings, :start_time, :time
    add_column :bookings, :start_time, :string, null:false
    remove_column :bookings, :end_time, :time
    add_column :bookings, :end_time, :string, null:false
    remove_column :events, :start_time, :time
    add_column :events, :start_time, :string, null:false
    remove_column :events, :end_time, :time
    add_column :events, :end_time, :string, null:false
    remove_column :results, :type, :string
  end
end
