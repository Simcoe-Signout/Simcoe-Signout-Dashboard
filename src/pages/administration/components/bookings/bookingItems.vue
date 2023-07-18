<template>
  <v-row class="ml-10 mt-2">
    <v-col v-for="(booking, i) in pagedBookings" :key="booking.id" cols="12" sm="6" md="4" lg="3"
      class="px-0 user-column">
      <v-row no-gutters class="align-center">
        <v-sheet rounded="xl" class="d-flex flex-wrap text-wrap text-left px-3 mt-5 mr-5" max-width="350" width="100%">
          <div class="ml-2 mb-2 text-wrap">
            <h1 class="mt-2">{{ booking.resourceName }}</h1>

            <h2 class="mt-1 font-weight-bold">Booker: <span class="font-weight-light">{{ booking.bookedBy }}</span></h2>
            <h2 class="mt-1 font-weight-bold">Booked Period: <span class="font-weight-light">{{
              booking.bookingDates[0].period }}</span></h2>
            <h2 class="mt-1 font-weight-bold">Destination: <span class="font-weight-light">{{ booking.destination
            }}</span></h2>
            <h2 class="mt-1 font-weight-bold">Comments: <span class="font-weight-light">{{ booking.comments }}</span></h2>
            <v-chip color="blue" class="mr-2 mt-2" v-for="(date, i) in booking.bookingDates" :key="i">{{ date.date
            }}</v-chip>

            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="red" class="mt-5 mb-3" variant="elevated"
                  @click="openConfirmationPopup(booking)">
                  <v-icon class="mr-2">mdi-delete</v-icon>
                  <h3>Cancel Booking</h3>
                </v-btn>
              </template>
            </v-menu>

            <h5>Created {{ getISO8601Date(booking.created_at) }} at {{ getISO8601Time(booking.created_at) }} (ID: {{
              booking.id }})</h5>
          </div>
        </v-sheet>
      </v-row>
    </v-col>
  </v-row>

  <v-dialog v-model="showConfirmationDialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Cancel Booking Confirmation</v-card-title>
      <v-card-text>
        <p>Are you sure you want to cancel {{ selectedBooking.bookedBy }}'s booking for resource "{{
          selectedBooking.resourceName }}"? (booking ID: {{ selectedBooking.id }})</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="hidePopup">Cancel</v-btn>
        <v-btn color="green" text @click="confirmCancelBooking">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-pagination class="mt-10" v-model="pageNo" :length="numPages"></v-pagination>
</template>
  
<script>
import { bookingsStore } from '@/stores/bookings';

export default {
  data() {
    return {
      bookings: [],
      bookingsStore: bookingsStore(),
      showConfirmationDialog: false,
      selectedBooking: null,
      pageNo: 1,
      bookingsPerPage: 12,
    };
  },
  methods: {
    async getAllBookings() {
      await this.bookingsStore.fetchBookings();
      this.bookings = this.bookingsStore.getBookings;
    },
    getISO8601Date(date) {
      return new Date(date).toISOString().slice(0, 10);
    },
    getISO8601Time(date) {
      return new Date(date).toISOString().slice(11, 16);
    },
    openConfirmationPopup(booking) {
      this.selectedBooking = booking;
      this.showConfirmationDialog = true;
    },
    hidePopup() {
      this.showConfirmationDialog = false;
    },
    async confirmCancelBooking() {
      await this.bookingsStore.deleteBooking(this.selectedBooking.id);
      this.hidePopup();
      await this.getAllBookings();
      this.bookings = this.bookingsStore.getBookings;
    },
  },
  computed: {
    numPages() {
      return Math.ceil(this.bookings.length / this.bookingsPerPage);
    },
    pagedBookings() {
      const startIndex = (this.pageNo - 1) * this.bookingsPerPage;
      const endIndex = startIndex + this.bookingsPerPage;

      return this.bookings.slice(startIndex, endIndex);
    }
  },
  async mounted() {
    await this.getAllBookings();
  },
};
</script>
  
<style>.text-wrap {
  word-break: break-word;
}</style>
  