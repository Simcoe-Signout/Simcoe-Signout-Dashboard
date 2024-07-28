<template>
        <div class="ml-10">
            <h1 class="mt-5 mb-2">Manage Bookings</h1>
            <filterButton />
            <v-divider class="mr-10"></v-divider>
        </div>
    <bookingItems />
</template>

<script>
import bookingItems from './components/bookings/Bookings.vue'
import filterButton from './components/bookings/FilterMenu.vue';

export default {
    components: {
        bookingItems,
        filterButton
    }
}
</script>