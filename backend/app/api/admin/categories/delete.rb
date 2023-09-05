module Admin
    module Categories
        class Delete < Grape::API
            params do
                requires :id, type: Integer
            end
            delete ':id' do
                category = Category.find_by_id(params[:id])
                if category.nil?
                  error!({ error: "Category not found" }, 404)
                else
                  category.destroy
                end
            end
        end
    end
end