module Booking
    module V1
      module Bookings
        class Index < Grape::API

            desc 'Returns all bookings, optional to specify in between two dates'
            params do
                optional :start_date, type: String, desc: 'Start date'
                optional :end_date, type: String, desc: 'End date'
            end

            get :bookings do
                if params[:start_date] && params[:end_date]
                start_date = Date.parse(params[:start_date])
                end_date = Date.parse(params[:end_date])

                @resource_bookings = ResourceBooking.select do |booking|
                    booking.bookingDates.any? do |bd_jsonb|
                      bd_date = bd_jsonb['date']
                      booking_date = Date.parse(bd_date)
                      booking_date >= start_date && booking_date <= end_date
                    end
                  end
                else
                  @resource_bookings = ResourceBooking.all
                end
              
                present(@resource_bookings)
            end
        end
      end
    end
end