<template>
    <div class="ml-10">
        <h1 class="mt-5">My Bookings</h1>
        <myBookingsCalendar />
        <v-divider class="mr-10"></v-divider>
    </div>
    <bookingItems />
</template>

<script>
import bookingItems from './components/bookingItems.vue';
import myBookingsCalendar from './components/myBookingsCalendar.vue';

export default {
    components: {
        bookingItems,
        myBookingsCalendar
    }
}
</script>