module Admin
    module Categories
        class Get < Grape::API
            get do
                categories = Category.all

                if categories.nil?
                    error!({ error: "Categories not found" }, 404)
                end

                present(categories)
            end
        end
    end
end