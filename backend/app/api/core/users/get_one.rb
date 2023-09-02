module Core
    module Users
        class GetOne < Grape::API
            params do
                requires :id, type: Integer
            end

            get ':id' do
                user = User.find_by_id(params[:id])
                if current_user.id == params[:id]
                    user
                elsif current_user.role == "admin"
                    user
                else
                    error!({ error: "User not found" }, 404)
                end
            end
        end
    end
end