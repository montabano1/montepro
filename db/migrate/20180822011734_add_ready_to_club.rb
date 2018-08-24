class AddReadyToClub < ActiveRecord::Migration[5.2]
  def change
    add_column :clubs, :ready, :string, null:false, :default => 'false'
  end
end
