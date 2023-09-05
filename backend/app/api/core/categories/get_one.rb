module Core
    module Categories
      class GetOne < Grape::API
        params do
          requires :id, type: Integer
        end
        get ':id' do
          category = Category.find_by_id(params[:id])
          if category.nil?
            error!({ error: "Category not found" }, 404)
          else
            present(category)
          end
        end
      end
    end
  end