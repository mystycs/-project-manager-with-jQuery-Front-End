class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.string :comment
      t.integer :project_id

      t.timestamps null: false
    end
  end
end
