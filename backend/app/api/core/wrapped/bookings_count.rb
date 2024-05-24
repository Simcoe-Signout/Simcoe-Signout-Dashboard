# frozen_string_literal: true

module Core
    module Wrapped
      class BookingsCount < Grape::API
  
        get :bookings_count do
            @resource_bookings = ResourceBooking.all
            
            @resource_bookings = @resource_bookings.select do |booking|
                booking.bookedById == current_user.id
            end

            @resource_bookings.count
        end
      end
    end
end
  