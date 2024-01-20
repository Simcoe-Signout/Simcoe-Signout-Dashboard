interface ResourceBooking {
    bookedBy: string;
    resource_id: number;
    bookingDates: BookingDate[];
    destination: string;
    comments: string;
}