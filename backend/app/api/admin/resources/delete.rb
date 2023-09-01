module Admin
    module Resources
        class Delete < Grape::API
            desc 'Delete a resource.'
            params do
                requires :id, type: Integer, desc: 'Resource ID.'
            end

            delete ':id' do
                resource = Resource.find_by_id(params[:id])
                if resource.nil?
                  error!({ error: "Resource not found" }, 404)
                else
                  resource.destroy
                end
            end
        end
    end
end