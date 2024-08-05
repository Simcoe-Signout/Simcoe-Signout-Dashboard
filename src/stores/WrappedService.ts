import { getRequest } from '@/helpers/RequestHelper';
import { defineStore } from 'pinia';

export const wrappedStore = defineStore({
    id: 'wrapped',
    state: () => ({
        api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : import.meta.env.MODE === 'staging' ? 'http://stgapi.simcoesignout.com' : 'https://api.simcoesignout.com'}/api/core/wrapped`
    }),
    actions: {
        // GLOBAL STATS
        async fetchGlobalBookingsCount() {
            const url = `${this.api_uri}/global_bookings_count`
            return await getRequest(url);
        },
        async fetchGlobalDaysBooked() {
            const url = `${this.api_uri}/global_days_booked`
            return await getRequest(url);
        },
        async fetchGlobalUsersCount() {
            const url = `${this.api_uri}/global_users_count`
            return await getRequest(url);
        },
        async fetchGlobalBookingTime() {
            const url = `${this.api_uri}/global_booking_time`
            return await getRequest(url);
        },
        // PERSONAL STATS
        async fetchPersonalBookingsCount() {
            const url = `${this.api_uri}/bookings_count`
            return await getRequest(url);
        },
        async fetchPersonalDaysBooked() {
            const url = `${this.api_uri}/days_booked`
            return await getRequest(url);
        },
        async fetchPersonalCancelledBookingsCount() {
            const url = `${this.api_uri}/cancelled_bookings_count`
            return await getRequest(url);
        },
        async fetchPersonalBookingTime() {
            const url = `${this.api_uri}/booking_time`
            return await getRequest(url);
        },
        async fetchPersonalDaysSinceJoined() {
            const url = `${this.api_uri}/days_since_joined`
            return await getRequest(url);
        }
    }
});