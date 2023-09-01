module Core
    module Resources
        class GetOne < Grape::API

            params do
                requires :id, type: Integer
            end

            get ':id' do
                resource = Resource.find_by_id(params[:id])
                if resource.nil?
                    error!({ error: "Resource not found" }, 404)
                else
                    present(resource)
                end
            end
        end
    end
end