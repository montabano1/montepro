class CreateCourts < ActiveRecord::Migration[5.2]
  def change
    create_table :courts do |t|
      t.integer :club_id, null:false
      t.string :name
      t.string :type
    end
    add_index :courts, :club_id
  end
end
