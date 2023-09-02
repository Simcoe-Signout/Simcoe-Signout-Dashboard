module Admin
    module Users
        class Put < Grape::API

            params do
                requires :user, type: Hash do
                  requires :id, type: Integer
                  requires :full_name, type: String
                  requires :email, type: String
                  requires :role, type: String
                  requires :uid, type: String
                  requires :avatar_url, type: String
                end
              end

            put ':id' do
                # Find the user by id
                user = User.find_by_id(params[:user][:id])
                unless user
                    error!({ error: "User not found" }, 404)
                end

                if user
                    error!({ error: "User already exists with that ID" }, 400)
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