import { defineStore } from 'pinia'

export const bookingsStore = defineStore({
    id: 'bookings',
    state: () => ({
        api_uri: 'http://localhost:3000/resource_bookings',
        validPeriods: [1, 2, 3, 4, 5],
        validPeriodLengths: ["Full Period", "Half Period"],
        bookings: [] as any[],
    }),
    getters: {
        getValidPeriods: (state) => state.validPeriods,
        getBookings: (state) => state.bookings,
        getValidPeriodLengths: (state) => state.validPeriodLengths,
        // TODO
        getAvailablePeriodsForResourceOnDate: (state) => (resourceName: string, date: string) => {
            const bookings = state.bookings.filter((booking: any) => booking.resourceName === resourceName);
            const periods = [1, 2, 3, 4, 5, 6, 7, 8];
            const availablePeriods = periods.filter((period) => {
                const booking = bookings.find((booking: any) => booking.bookingDates.find((bookingDate: any) => bookingDate.date === date && bookingDate.period === period));
                return !booking;
            });
            return availablePeriods;
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