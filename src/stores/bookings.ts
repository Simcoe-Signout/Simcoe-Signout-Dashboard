import { defineStore } from 'pinia'

export const bookingsStore = defineStore({
    id: 'bookings',
    state: () => ({
        api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : 'https://simcoe-signout-api.ian-tapply.me'}/resource_bookings`,
        validPeriods: [1, 2, 3, 4],
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
        getAvailablePeriodsForResourceOnDates: (state) => (resourceName: string, dates: string[]) => {
            // Get all bookings for the resource
            const bookings = state.bookings.filter((booking: any) => booking.resourceName === resourceName);

            // Filter bookings that overlap with any of the dates
            const overlappingBookings = bookings.filter((booking: any) => {
                const overlappingDates = booking.bookingDates.filter((bookingDate: any) => dates.includes(bookingDate.date));
                return overlappingDates.length > 0;
            });

            // Get all periods for the resource
            const allPeriods = state.validPeriods;

            // Get all periods that are not booked on any of the dates
            const availablePeriods = allPeriods.filter((period: number) => {
                const overlappingBookingsForPeriod = overlappingBookings.filter((booking: any) => booking.bookingDates.find((bookingDate: any) => bookingDate.period === period));
                return overlappingBookingsForPeriod.length === 0;
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
        async fetchBookingsForDate(date: string) {
            const res = await fetch(`${this.api_uri}?date=${date}`, {
                method: 'GET',
                credentials: 'include'
            })
            return await res.json();
        },
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