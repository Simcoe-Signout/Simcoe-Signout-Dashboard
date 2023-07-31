module Booking
    module V1
        module Helpers
            module Authentication
                def authenticate_request
                    @current_user = AuthorizeApiRequest.call(cookies).result
                    error!({ error: 'Not Authorized' }, 401) unless @current_user
                end

                def authenticate_admin
                    unless @current_user && @current_user.role == "administrator"
                        error!({ error: 'User does not have permission to access this endpoint.' }, :forbidden)
                    end
                end
            end
        end
    end
end