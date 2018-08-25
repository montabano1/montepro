class AddClubEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :club_id, :integer, null:false
    add_index :events, :club_id
  end
end
