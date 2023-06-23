require "test_helper"

class ResourceBookingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @resource_booking = resource_bookings(:one)
  end

  test "should get index" do
    get resource_bookings_url, as: :json
    assert_response :success
  end

  test "should create resource_booking" do
    assert_difference("ResourceBooking.count") do
      post resource_bookings_url, params: { resource_booking: { bookedBy: @resource_booking.bookedBy, bookingDates: @resource_booking.bookingDates, comments: @resource_booking.comments, destination: @resource_booking.destination, resourceName: @resource_booking.resourceName } }, as: :json
    end

    assert_response :created
  end

  test "should show resource_booking" do
    get resource_booking_url(@resource_booking), as: :json
    assert_response :success
  end

  test "should update resource_booking" do
    patch resource_booking_url(@resource_booking), params: { resource_booking: { bookedBy: @resource_booking.bookedBy, bookingDates: @resource_booking.bookingDates, comments: @resource_booking.comments, destination: @resource_booking.destination, resourceName: @resource_booking.resourceName } }, as: :json
    assert_response :success
  end

  test "should destroy resource_booking" do
    assert_difference("ResourceBooking.count", -1) do
      delete resource_booking_url(@resource_booking), as: :json
    end

    assert_response :no_content
  end
end
