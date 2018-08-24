class AddClubSecret < ActiveRecord::Migration[5.2]
  def change
    add_column :clubs, :secret, :string, null:false
  end
end
