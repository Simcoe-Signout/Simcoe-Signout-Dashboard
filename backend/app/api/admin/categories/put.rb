module Admin
    module Categories
      class Put < Grape::API
        params do
            requires :id, type: Integer 
            requires :category, type: Hash do
                requires :title, type: String
                requires :description, type: String
            end
        end
  
        put ':id' do
          # Find the category by id
          category = Category.find_by_id(params[:id])
          unless category
            error!({ error: "Category not found" }, 404)
          end

          if category && category.id != params[:id]
            error!({ error: "Category already exists with that name" }, 400)
          end
  
          # Update the category attributes
          category.assign_attributes(params[:category])
  
          # Save the updated resource
          if category.save
            category
          else
            error!({ error: category.errors.full_messages.join(", ") }, 422)
          end
        end
      end
    end
  end