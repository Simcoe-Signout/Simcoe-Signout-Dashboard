module Admin
    module Bookings
        class Base < Grape::API
            prefix 'api/admin/bookings'
  
            mount Ping
        end
    end
end