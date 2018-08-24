class CreateResults < ActiveRecord::Migration[5.2]
  def change
    create_table :results do |t|
      t.integer :winner_id, null:false
      t.integer :loser_id, null:false
      t.string :type
      t.integer :line_num
      t.string :score
    end
    add_index :results, :winner_id
    add_index :results, :loser_id
  end
end
