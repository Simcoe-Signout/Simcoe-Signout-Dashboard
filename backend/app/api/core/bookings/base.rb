module Core
    module Bookings
        class Base < Grape::API
            prefix 'api/core/bookings'
  
            mount Get
            mount GetOne
            mount Post
            mount Delete
        end
    end
end