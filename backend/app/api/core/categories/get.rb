module Core
    module Categories
        class Get < Grape::API
            get do
                categories = Category.all

                if categories.nil?
                    error!({ error: "Categories not found" }, 404)
                end

                response_categories = categories.map do |category|
                    {
                      id: category.id,
                      title: category.title,
                      description: category.description
                    }
                end

                present(response_categories)
            end
        end
    end
end