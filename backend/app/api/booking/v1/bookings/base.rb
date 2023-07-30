module Booking
    module V1
        module Bookings
            class Base < Grape::API
                # Mount all booking related endpoints
                mount Index
            end
        end
    end
end