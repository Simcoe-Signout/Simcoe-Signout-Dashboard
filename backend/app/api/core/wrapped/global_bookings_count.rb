# frozen_string_literal: true

module Core
    module Wrapped
      class GlobalBookingsCount < Grape::API
  
        get :global_bookings_count do
          bookings = ResourceBooking.all
          bookings.count
        end
      end
    end
end
  