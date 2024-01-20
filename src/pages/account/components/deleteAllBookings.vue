<template v-slot:activator="{ props }">
    <v-btn class="mt-2 mb-2 ml-2" color="red" variant="outlined" @click="deleteAllBookings()">
        <h3>Delete All My Bookings</h3>
    </v-btn>
</template>

<script>
import { bookingsStore } from '@/stores/bookings';
export default {
    data: () => {
        return {
            bookingsStore: bookingsStore(),
        }
    },
    methods: {
        deleteAllBookings() {
            this.bookingsStore.deleteAllMyBookings();
        }
    }
}
</script>