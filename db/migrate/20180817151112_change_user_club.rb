class ChangeUserClub < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :club, :string
    add_column :users, :club_id, :integer
    add_index :users, :club_id
  end
end
