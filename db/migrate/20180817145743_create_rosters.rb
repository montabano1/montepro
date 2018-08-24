class CreateRosters < ActiveRecord::Migration[5.2]
  def change
    create_table :rosters do |t|
      t.integer :team_id
      t.integer :member_id
    end
    add_index :rosters, :team_id
    add_index :rosters, :member_id
  end
end
