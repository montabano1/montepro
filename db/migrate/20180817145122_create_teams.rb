class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name, null:false
      t.string :sport, null:false
      t.string :gender
      t.integer :captain_id
    end
    add_index :teams, :captain_id
  end
end
