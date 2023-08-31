module Admin
    module Users
        class Ping < Grape::API
            get :ping do
                'pong'
            end
        end
    end
end