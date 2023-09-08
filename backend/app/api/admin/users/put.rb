module Admin
    module Users
        class Put < Grape::API

            params do
                requires :id, type: Integer
                requires :user, type: Hash do
                  requires :full_name, type: String
                  requires :email, type: String
                  requires :role, type: String
                  requires :avatar_url, type: String
                end
              end

            put ':id' do
                # Find the user by id
                user = User.find_by_id(params[:id])
                unless user
                    error!({ error: "User not found" }, 404)
                end
        
                # Update the user attributes
                user.assign_attributes(params[:user])
        
                # Save the updated user
                if user.save
                    user
                else
                    error!({ error: user.errors.full_messages.join(", ") }, 422)
                end
            end
        end
    end
end