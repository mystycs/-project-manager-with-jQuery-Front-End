class CreateProjectCategories < ActiveRecord::Migration
  def change
    create_table :project_categories do |t|
      t.belongs_to :project, index: true, foreign_key: true
      t.belongs_to :category, index: true, foreign_key: true
     #t.timestamps null: false

    end
  end
end
