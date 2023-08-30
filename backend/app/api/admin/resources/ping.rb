module Admin
    module Bookings
        class Ping < Grape::API
            get :ping do
                'pong'
            end
        end
    end
end