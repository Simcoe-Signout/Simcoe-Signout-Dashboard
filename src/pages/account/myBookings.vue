<template>
    <div class="ml-10">
        <h1 class="mt-5">My Bookings</h1>
        <myBookingsCalendar />
        <deleteAllBookings v-show="checkIfInDevelopment"/>
        <v-divider class="mr-10"></v-divider>
    </div>
    <bookingItems />
</template>

<script>
import bookingItems from './components/bookingItems.vue';
import myBookingsCalendar from './components/myBookingsCalendar.vue';
import deleteAllBookings from './components/deleteAllBookings.vue';

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
            if (process.env.NODE_ENV === "development") {
                return true;
            } else {
                return false;
            }
        }
    },
    mounted() {
        this.checkIfInDevelopment();
    }
}
</script>