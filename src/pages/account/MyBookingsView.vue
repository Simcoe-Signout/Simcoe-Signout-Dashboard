<template>
    <div class="ml-10">
        <h1 class="mt-5">My Bookings</h1>
        <myBookingsCalendar />
        <!-- <deleteAllBookings v-show="checkIfInDevelopment" /> -->
        <v-divider class="mr-10"></v-divider>
    </div>
    <bookingItems />
</template>

<script>
import bookingItems from './components/Bookings.vue';
import myBookingsCalendar from './components/BookingsCalendar.vue';
import deleteAllBookings from './components/DeleteBookingsButton.vue';

export default {
    components: {
        bookingItems,
        myBookingsCalendar,
        deleteAllBookings
    },
    data() {
        return {
            mode: process.env.NODE_ENV
        }
    },
    methods: {
        checkIfInDevelopment() {
            return process.env.NODE_ENV === "development";
        }
    },
    mounted() {
        this.checkIfInDevelopment();
    }
}
</script>