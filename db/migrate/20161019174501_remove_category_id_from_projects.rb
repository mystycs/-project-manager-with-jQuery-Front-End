class RemoveCategoryIdFromProjects < ActiveRecord::Migration
  def change
    remove_column :projects, :category_id, :integer
  end
end
