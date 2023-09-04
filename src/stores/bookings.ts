import { defineStore } from 'pinia'

export const bookingsStore = defineStore({
    id: 'bookings',
    state: () => ({
        api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : 'https://api.simcoesignout.com'}/api/core/bookings`,
        admin_api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : 'https://api.simcoesignout.com'}/api/admin/bookings`,
        validPeriods: [1, 2, 3, 4],
        bookings: [] as any[],

        filteredPeriod: 1,
        filteredDateFrom: new Date().toISOString().slice(0, 10),
        filteredDateTo: new Date().toISOString().slice(0, 10),
        filteredResourceName: '',
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
            const res = await fetch(`${this.admin_api_uri}?period=${this.filteredPeriod}&resource_name=${this.filteredResourceName}&start_date=${this.filteredDateFrom}&end_date=${this.filteredDateTo}`, {
                method: 'GET',
                credentials: 'include'
            })
            this.bookings = await res.json();
        },
        // Fetches all bookings from the API
        async fetchAllBookings() {
            const res = await fetch(this.api_uri, {
                method: 'GET',
                credentials: 'include'
            })
            this.bookings = await res.json();
        },
        // Fetches all my bookings from the API
        async fetchMyBookings() {
            const res = await fetch(`${this.api_uri}?only_mine=true`, {
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
                body: JSON.stringify({ booking:{
                    bookedBy: booking.bookedBy,
                    resourceName: booking.resourceName,
                    bookingDates: booking.bookingDates,
                    destination: booking.destination,
                    comments: booking.comments,
                }}),
            });
            const newBooking = await res.json();
            this.bookings.push(newBooking);
        },
        // Deletes a booking
        // Also known as cancelling bookings
        async deleteBooking(id: string) {
            await fetch(`${this.admin_api_uri}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            this.bookings = this.bookings.filter((booking: any) => booking.id !== id);
        }
    },
})