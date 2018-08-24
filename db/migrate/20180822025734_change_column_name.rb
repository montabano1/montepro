class ChangeColumnName < ActiveRecord::Migration[5.2]
  def change
    remove_column :courts, :type, :string
    add_column :courts, :court_type, :string
  end
end
