# frozen_string_literal: true

module Core
    module Wrapped
      class Base < Grape::API
        prefix 'api/core/wrapped'
  
        mount GlobalBookingsCount
        mount GlobalDaysBooked # fix it only getting each item in the bookingDates array
        mount GlobalUsersCount
        mount GlobalBookingTime

        mount BookingsCount
        mount BookingTime
        mount CancelledBookingsCount
        mount DaysBooked
        mount DaysSinceJoined
      end
    end
  end
  