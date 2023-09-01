module Core
  module Resources
    class Get < Grape::API
      params do
        optional :category, type: String
      end

      get do
        resources = Resource.all
        if params[:category].present?
          resources = resources.where(category: params[:category])
        end
        resources
      end
    end
  end
end