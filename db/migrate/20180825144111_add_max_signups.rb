class AddMaxSignups < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :maxppl, :integer
    add_column :events, :date, :string, null: false
  end
end
