class ResourceBookingsController < ApplicationController
  before_action :set_resource_booking, only: %i[ show update destroy ]
  before_action :authenticate_admin, only: %i[index show update destroy]

  # GET /resource_bookings
  def index
    @resource_bookings = ResourceBooking.all

    render json: @resource_bookings
  end

  # GET /resource_bookings/1
  def show
    render json: @resource_booking
  end

  # POST /resource_bookings
  def create
    @resource_booking = ResourceBooking.new(resource_booking_params)

    if @resource_booking.save
      render json: @resource_booking, status: :created, location: @resource_booking
    else
      render json: @resource_booking.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /resource_bookings/1
  def update
    if @resource_booking.update(resource_booking_params)
      render json: @resource_booking
    else
      render json: @resource_booking.errors, status: :unprocessable_entity
    end
  end

  # DELETE /resource_bookings/1
  def destroy
    @resource_booking.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_resource_booking
      @resource_booking = ResourceBooking.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def resource_booking_params
      params.require(:resource_booking).permit(:id, :bookedBy, :resourceName, { bookingDates: [:date, :period, :periodLength] }, :destination, :comments)
    end

    def authenticate_admin
      unless current_user && current_user.role == "administrator"
        render json: { error: 'User does not have permission to access this endpoint.' }, status: :forbidden
      end
    end  
end
