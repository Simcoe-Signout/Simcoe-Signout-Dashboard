module Core
  module Resources
    class Get < Grape::API
      params do
        optional :categories, type: String
      end

      get do
        resources = Resource.all
        if params[:categories].present?
          categories = params[:categories].split(",")
          resources = resources.where(category: categories)
        end
        resources
      end
    end
  end
end