module Core
    module Bookings
        class Base < Grape::API
            prefix 'api/core/bookings'
  
            mount Get
            mount Post
            mount Delete
        end
    end
end