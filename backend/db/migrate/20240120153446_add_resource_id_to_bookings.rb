class AddResourceIdToBookings < ActiveRecord::Migration[7.0]
  def up
    add_column :resource_bookings, :resource_id, :integer

    ResourceBooking.reset_column_information
    ResourceBooking.find_each do |booking|
      resource = Resource.find_by_name(booking.resourceName)
      booking.update(resource_id: resource.id) if resource
    end
  end

  def down
    remove_column :resource_bookings, :resource_id
  end
end