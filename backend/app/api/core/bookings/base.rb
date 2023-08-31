module Core
    module Bookings
        class Base < Grape::API
            prefix 'api/core/bookings'
  
            mount Get
            mount Post
        end
    end
end