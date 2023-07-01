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
            console.log(bookings);
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
        },
        async fetchBookingsForDate(date: string) {
            const res = await fetch(`${this.api_uri}?date=${date}`, {
                method: 'GET',
                credentials: 'include'
            })
            return await res.json();
        },
        async getAvailablePeriodsFromBookings(resourceName: string, start_date: string, end_date: string) {
            const res = await fetch(`${this.api_uri}?start_date=${start_date}&end_date=${end_date}`, {
                method: 'GET',
                credentials: 'include'
            })
            console.log(await res.json());

            return this.validPeriods;
          
            // const bookedPeriods = bookings.filter((booking) => {
            //     return (
            //       booking.resourceName === resourceName &&
            //       booking.bookingDates.some((bookingDate) => {
            //         const bookingDateObj = JSON.parse(bookingDate.replace(/=>/g, ':'));
            //         const bookingDate2 = bookingDateObj.date;
            //         return bookingDate2 >= start_date && bookingDate2 <= end_date;
            //       })
            //     );
            //   }).flatMap((booking) => {
            //     return booking.bookingDates
            //       .map((bookingDate) => JSON.parse(bookingDate.replace(/=>/g, ':')))
            //       .filter((bookingDateObj) => {
            //         const bookingDate = bookingDateObj.date;
            //         return bookingDate >= start_date && bookingDate <= end_date;
            //       })
            //       .map((bookingDateObj) => bookingDateObj.period);
            //   });
            
            //   const availablePeriods = this.validPeriods.filter(
            //     (period) => !bookedPeriods.includes(period)
            //   );
            
            //   console.log(availablePeriods);
            //   return availablePeriods;
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