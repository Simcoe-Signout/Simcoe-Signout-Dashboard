import { defineStore } from 'pinia'

export const bookingsStore = defineStore({
    id: 'bookings',
    state: () => ({
        api_uri: 'http://localhost:3000/resource_bookings',
        validPeriods: [1, 2, 3, 4, 5],
        bookings: [] as any[],
    }),
    getters: {
        getValidPeriods: (state) => state.validPeriods,
        getBookings: (state) => state.bookings,
        getBookingsForResourceOnDate: (state) => (resourceName: string, date: string) => {
            const bookings = state.bookings.filter((booking: any) => booking.resourceName === resourceName);
            const filteredBookings = bookings.filter((booking: any) => booking.bookingDates.find((bookingDate: any) => bookingDate.date === date));
            return filteredBookings;
        },
        getBookingsForResource: (state) => (resourceName: string) => {
            const bookings = state.bookings.filter((booking: any) => booking.resourceName === resourceName);
            return bookings;
        },
        getBookingsWithDates: (state) => (date: string) => {
            const bookings = state.bookings.filter((booking: any) => booking.bookingDates.find((bookingDate: any) => bookingDate.date === date));
            return bookings;
        },
        getBookingsInDateRange: (state) => (startDate: string, endDate: string) => {
            const bookings = state.bookings.filter((booking: ResourceBooking) => {
                // check if any of the dates within the bookingdates array are the same as the start or end date
                const bookingDates = booking.bookingDates.filter((bookingDate: BookingDate) => {
                    return bookingDate.date === startDate || bookingDate.date === endDate;
                })
                return bookingDates;
            });
            return bookings;
        }
    },
    actions: {
        // Fetches all bookings from the API
        async fetchBookings() {
            const res = await fetch(this.api_uri, {
                method: 'GET',
                credentials: 'include'
            })
            this.bookings = await res.json();
            console.log(this.getBookingsWithDates('2023-06-01'));
        },
        // Creates a new booking
        async createBooking(booking: ResourceBooking) {
            const res = await fetch(this.api_uri, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookedBy: booking.bookedBy,
                    resourceName: booking.resourceName,
                    bookingDates: booking.bookingDates,
                    destination: booking.destination,
                    comments: booking.comments,
                }),
            });
            const newBooking = await res.json();
            this.bookings.push(newBooking);
        },
        // Deletes a booking
        // Also known as cancelling bookings
        async deleteBooking(id: string) {
            await fetch(`${this.api_uri}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            this.bookings = this.bookings.filter((booking: any) => booking.id !== id);
        }
    },
})