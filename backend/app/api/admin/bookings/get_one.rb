module Admin
  module Bookings
    class GetOne < Grape::API
      params do
        requires :id, type: Integer
      end
      get ':id' do
        resource_booking = ResourceBooking.find_by_id(params[:id])
        if resource_booking.nil?
          error!({ error: "Booking not found" }, 404)
        else
          present(resource_booking)
        end
      end
    end
  end
end