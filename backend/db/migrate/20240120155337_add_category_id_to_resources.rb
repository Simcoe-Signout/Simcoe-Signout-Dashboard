class AddCategoryIdToResources < ActiveRecord::Migration[7.0]
  def up
    add_column :resources, :category_id, :integer

    Resource.reset_column_information
    Resource.find_each do |resource|
      category = Category.find_by_title(resource.category)
      resource.update(category_id: category.id) if category
    end
  end

  def down
    remove_column :resources, :category_id
  end
end