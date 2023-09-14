<template>
    <v-menu v-model="bookingsMenuOpen" :close-on-content-click="false" location="end">
        <template v-slot:activator="{ props }">
            <v-btn class="mt-2 mb-2" color="blue" variant="outlined" v-bind="props" @click="openBookingsMenu()">
                <h3>View My Bookings</h3>
            </v-btn>
        </template>

        <!-- BOOKINGA MENU -->
        <v-card width="420">

            <v-expand-transition>
                <v-card class="v-card--reveal">
                    <v-row class="text-center align-center justify-center">
                        <v-col>
                            <VCalendar :attributes="attributes()" is-dark="system"
                                class="mb-4" expanded />
                            <h3 class="mb-2">Period Identifiers</h3>
                            <div class="d-flex ml-10">
                                <div class="d-flex align-items-center">
                                    <v-badge dot color="blue" class="pt-2">
                                        <v-icon size="x-large"></v-icon>
                                    </v-badge>
                                    <span class="ml-2"> = 1</span>
                                </div>
                                <div class="d-flex">
                                    <v-badge dot color="red" class="pt-2">
                                        <v-icon size="x-large"></v-icon>
                                    </v-badge>
                                    <span class="ml-2"> = 2</span>
                                </div>
                                <div class="d-flex">
                                    <v-badge dot color="green" class="pt-2">
                                        <v-icon size="x-large"></v-icon>
                                    </v-badge>
                                    <span class="ml-2"> = 3</span>
                                </div>
                                <div class="d-flex">
                                    <v-badge dot color="#c18900" class="pt-2">
                                        <v-icon size="x-large"></v-icon>
                                    </v-badge>
                                    <span class="ml-2"> = 4</span>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-expand-transition>
        </v-card>
    </v-menu>
</template>

<script>
import { resourcesPageStore } from '@/stores/resources';
import { bookingsStore } from '@/stores/bookings';
import { authenticationStore } from '@/stores/authentication';

const validPhases = ["when", "where", "comments", "review"];

export default {
    data: () => ({
        bookingsStore: bookingsStore(),
        authenticationStore: authenticationStore(),
        bookingsMenuOpen: false,
        date: new Date(),
        rules: {
            required: value => !!value || 'This field is required.',
        },
    }),
    methods: {
        /**
         * Opens the bookings menu
         */
        openBookingsMenu() {
            this.bookingsMenuOpen = true;
        },
        /**
         * Closes the bookings menu
         */
        closeBookingsMenu() {
            this.bookingsMenuOpen = false;
        },
        /**
         * Get bookings in an array form for the calendar
         */
        getBookings() {
            const bookings = [];

            this.bookingsStore.bookings.forEach(booking => {
                booking.bookingDates.forEach(bookingDate => {
                    let color = null;

                    // Set the color based on the bookingDate.period value
                    switch (bookingDate.period) {
                        case 1:
                            color = 'blue';
                            break;
                        case 2:
                            color = 'red';
                            break;
                        case 3:
                            color = 'green';
                            break;
                        case 4:
                            color = 'yellow';
                            break;
                        default:
                            break;
                    }

                    bookings.push({
                        resourceName: booking.resourceName,
                        period: bookingDate.period,
                        date: new Date(bookingDate.date),
                        bookerFirstName: booking.bookedBy.split(' ')[0],
                        bookerLastName: booking.bookedBy.split(' ')[1],
                        color: color,
                    });
                });
            });

            return bookings;
        },
        attributes() {
            const bookings = this.getBookings();

            const test = [
                ...bookings
                    .sort((a, b) => a.period - b.period) // Sort the bookings by period value
                    .map(booking => ({
                        dates: new Date(booking.date.getFullYear(), booking.date.getMonth(), booking.date.getDate() + 1), // Shift the date forward by one day
                        dot: {
                            color: booking.color,
                            class: booking.isComplete ? "opacity-75" : "",
                        },
                        popover: {
                            label: booking.bookerLastName + ", " + booking.bookerFirstName + " - " + booking.resourceName + " (Period " + booking.period + ")",
                        },
                    })),
            ];

            return test;
        },
    },
    async mounted() {
        await this.bookingsStore.fetchMyBookings();
    }
}
</script>

<style>
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}

.flexcard {
    display: flex;
    flex-direction: column;
}
</style>