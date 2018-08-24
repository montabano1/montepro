class AddColumnProMember < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :pro_member, :string, null: false
    add_column :users, :authorized, :string, null: false, :default => 'false'
    add_column :users, :club, :string, null: false
  end
end
