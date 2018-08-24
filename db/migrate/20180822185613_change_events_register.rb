class ChangeEventsRegister < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :registerable, :string, null:false
  end
end
