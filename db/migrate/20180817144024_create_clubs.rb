class CreateClubs < ActiveRecord::Migration[5.2]
  def change
    create_table :clubs do |t|
      t.string :name, null:false
      t.integer :director_id
      t.integer :court_amt
      t.float :lat
      t.float :lng
      t.string :phone_number
      t.string :email
      t.string :address
    end
  end
end
