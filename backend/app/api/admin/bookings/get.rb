module Admin
  module Bookings
    class Get < Grape::API
      params do
        optional :start_date, type: String
        optional :end_date, type: String
        optional :period, type: String
        optional :resource_name, type: String
      end

      get do
        if params[:start_date].present? && params[:end_date].present?
          start_date = Date.parse(params[:start_date])
          end_date = Date.parse(params[:end_date])

          @resource_bookings = ResourceBooking.select do |booking|
            booking.bookingDates.any? do |date|
              bd_date = date['date']
              booking_date = Date.parse(bd_date)
              booking_date >= start_date && booking_date <= end_date
            end
          end

          if params[:period].present?
            periods = params[:period].split(',').map(&:to_i)
            @resource_bookings = @resource_bookings.select do |booking|
              booking.bookingDates.any? do |date|
                periods.include?(date['period'])
              end
            end
          end

          if params[:resource_name].present?
            @resource_bookings = @resource_bookings.select do |booking|
              booking.resourceName == params[:resource_name]
            end
          end
        elsif params[:period].present?
          periods = params[:period].split(',').map(&:to_i)
          @resource_bookings = ResourceBooking.select do |booking|
            booking.bookingDates.any? do |date|
              periods.include?(date['period'])
            end
          end

          if params[:resource_name].present?
            @resource_bookings = @resource_bookings.select do |booking|
              booking.resourceName == params[:resource_name]
            end
          end
        elsif params[:resource_name].present?
          @resource_bookings = ResourceBooking.select do |booking|
            booking.resourceName == params[:resource_name]
          end
        else
          @resource_bookings = ResourceBooking.all
        end

        present(@resource_bookings)
      end
    end
  end
end