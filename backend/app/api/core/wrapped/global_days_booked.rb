# frozen_string_literal: true

module Core
    module Wrapped
      class GlobalDaysBooked < Grape::API
  
        get :global_days_booked do
          # for every booking, get each day in the bookingDates array and add plus one day to the total
            # return the total
            bookings = ResourceBooking.all
            total_days = 0
            bookings.each do |booking|
                booking_dates = booking.bookingDates
                booking_dates.each do |date|
                total_days += 1
                end
            end
            total_days
        end
      end
    end
end
  