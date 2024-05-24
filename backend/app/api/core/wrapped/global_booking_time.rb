# frozen_string_literal: true

module Core
    module Wrapped
      class GlobalBookingTime < Grape::API
  
        get :global_booking_time do
          # for every booking, get each item in the bookingDates array and for each one add 75 minutes to the count
            # return the total
            bookings = ResourceBooking.all
            total_time = 0
            bookings.each do |booking|
                booking_dates = booking.bookingDates
                booking_dates.each do |date|
                total_time += 75
                end
            end
            total_time
        end
      end
    end
end
  