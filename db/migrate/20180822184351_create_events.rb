class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title, null:false
      t.time :start_time, null:false
      t.time :end_time, null:false
      t.string :event_type, null:false
    end
  end
end
