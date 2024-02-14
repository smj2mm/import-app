class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.datetime :date
      t.string :product_id
      t.float :weight
      t.string :unit

      t.timestamps
    end

    add_index :products, :product_id, unique: true
  end
end
