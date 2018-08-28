class AddClubAvails < ActiveRecord::Migration[5.2]
  def change
    add_column :availabilities, :club_id, :integer, null:false
    add_index :availabilities, :club_id
  end
end
