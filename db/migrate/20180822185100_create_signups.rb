class CreateSignups < ActiveRecord::Migration[5.2]
  def change
    create_table :signups do |t|
      t.integer :member_id, null:false
      t.integer :event_id, null:false
      t.timestamps
    end
    add_index :signups, :member_id
    add_index :signups, :event_id
    add_index :signups, [:member_id, :event_id], unique:true
  end
end
