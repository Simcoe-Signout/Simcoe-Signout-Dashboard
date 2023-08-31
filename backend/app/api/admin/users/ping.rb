module Admin
    module Resources
        class Ping < Grape::API
            get :ping do
                'pong'
            end
        end
    end
end