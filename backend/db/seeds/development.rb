[
  {
    full_name: 'Seed User',
    email: 'seeduser@local.host',
    role: 'admin',
    uid: 'TheSeedUser',
    avatar_url: 'avatar_url.local.host'
  }
].each { |user| User.find_or_create_by!(user) }

[
  {
    name: 'Sushi Robot',
    description: 'A cute little robot capable of bringing food to your table',
    location: 'Diramio\'s room',
    category: 'robots'
  },
  {
    name: '1114 Test Robot',
    description: 'This robot hates the Sushi Robot, because Sushi Robot is stopping the students from learning FRC Code',
    location: 'Robot Storage Closet',
    category: 'robots'
  }
].each { |resource| Resource.find_or_create_by!(resource) }

# Prepare data we need to bulk create sample bookings
from_booking_date = 1.month.ago.to_date
to_booking_date = 1.month.from_now.to_date

resource_names = Resource.all.pluck(:name)
destinations = %w[130 1114 148 2056]
periods = [1, 2, 3, 4]
comments = [
  "Cody was here",
  "Ian is a bean",
  "Diramio used to have huge hair"
]

# Create a hash to keep track of booked periods for each resource and date
booked_periods = {}

100.times do
  resource_name = resource_names.sample
  random_date = rand(from_booking_date..to_booking_date)
  period = periods.sample

  # Ensure that the same period is not assigned to the same date for the same resource
  if booked_periods.key?(resource_name) && booked_periods[resource_name].key?(random_date) && booked_periods[resource_name][random_date].include?(period)
    # If the period is already booked for the date, choose a different period
    available_periods = periods - booked_periods[resource_name][random_date]
    if available_periods.empty?
      # All periods are booked for this date, so choose a different date
      random_date = rand(from_booking_date..to_booking_date)
    else
      period = available_periods.sample
    end
  else
    booked_periods[resource_name] ||= {}
  end

  # Update the booked_periods hash with the new booking
  booked_periods[resource_name][random_date] ||= []
  booked_periods[resource_name][random_date] << period

  ResourceBooking.create(
    resourceName: resource_name,
    bookedBy: 'Seed User',
    bookingDates: [{ date: random_date.to_date, period: period }],
    destination: destinations.sample,
    comments: comments.sample
  )
end
