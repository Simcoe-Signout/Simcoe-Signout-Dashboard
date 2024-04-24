# frozen_string_literal: true

module Core
    module Wrapped
      class CancelledBookingsCount < Grape::API
  
        get :cancelled_bookings_count do
            @resource_bookings = ResourceBooking.all
            
            @resource_bookings = @resource_bookings.select do |booking|
                booking.bookedById == current_user.id && booking.deleted == true
            end

            @resource_bookings.count
        end
      end
    end
end
  