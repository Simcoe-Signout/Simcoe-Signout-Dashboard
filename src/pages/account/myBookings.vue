<template>
    <div class="ml-10">
        <h1 class="mt-5mb-2">My Bookings</h1>
        <v-divider class="mr-10"></v-divider>
    </div>
    <bookingItems />
</template>

<script>
import bookingItems from './components/bookingItems.vue'

export default {
    components: {
        bookingItems
    }
}
</script>