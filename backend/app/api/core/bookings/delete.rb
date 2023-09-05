module Core
    module Bookings
        class Delete < Grape::API
            params do
                requires :id, type: Integer
            end
            delete ':id' do
                resource_booking = ResourceBooking.find_by_id(params[:id])

                if resource_booking.bookedById != current_user.id
                    error!({ error: "You are not authorized to delete this booking" }, 403)
                end

                if resource_booking.nil?
                  error!({ error: "Booking not found" }, 404)
                else
                  resource_booking.destroy
                end
            end
        end
    end
end