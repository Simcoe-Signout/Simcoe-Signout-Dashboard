<template>
    <h1 class="mt-5 ml-10 mb-2">Manage Bookings</h1>
    <v-divider class="ml-10 mr-10"></v-divider>
    <bookingItems />
</template>

<script>
import bookingItems from './components/bookings/bookingItems.vue'

export default {
    components: {
        bookingItems
    }
}
</script>