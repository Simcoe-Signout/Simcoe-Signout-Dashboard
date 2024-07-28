<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-center">Your 2023-2024 Wrapped</h1>
                <h4 class="font-weight-light text-center">
                    What a school year it has been indeed. Not only has it been a great year,
                    but plenty of<br />
                    bookings have been made this school year with Simcoe Signout and am I ever impressed with the
                    statistics.
                </h4>
                <br />
                <h2 class="text-center">Let's take a look at some stats...</h2>
            </v-col>
        </v-row>
        <br />
        <h1 class="mb-2 text-center">Global 2023-2024 Stats</h1>
        <v-row>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title class="font-weight-medium pb-0">Global Bookings Made</v-card-title>
                    <v-card-text>
                        <h3 class="font-weight-light font-italic mb-2">The total amount of bookings made on Simcoe
                            Signout</h3>
                        <h2>
                            <count-up :end-val="globalBookingsMade" duration="4"></count-up>
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title class="font-weight-medium pb-0">Global Days Booked</v-card-title>
                    <v-card-text>
                        <h3 class="font-weight-light font-italic mb-2">The total number of days that a booking has been created for</h3>
                        <h2>
                            <count-up :end-val="globalDaysBooked" duration="4"></count-up>
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title class="font-weight-medium pb-0">Global New Users</v-card-title>
                    <v-card-text>
                        <h3 class="font-weight-light font-italic mb-2">The total number of new users on Simcoe Signout</h3>
                        <h2>
                            <count-up :end-val="globalNewUsers" duration="4"></count-up>
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title class="font-weight-medium pb-0">Global Booking Time</v-card-title>
                    <v-card-text>
                        <h3 class="font-weight-light font-italic mb-2">The combined total duration that bookings covered</h3>
                        <h2 style="display: flex; align-items: baseline;">
                            <count-up :end-val="globalBookingTime" duration="4"></count-up>&nbsp;Minutes
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <br />
        <h1 class="mb-2 text-center">Your 2023-2024 Stats</h1>
        <v-row>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title class="font-weight-medium pb-0">Bookings Made</v-card-title>
                    <v-card-text>
                        <h3 class="font-weight-light font-italic mb-2">The total number of bookings you have made</h3>
                        <h2>
                            <count-up :end-val="yourBookingsMade" duration="4"></count-up>
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title class="font-weight-medium pb-0">Days Booked</v-card-title>
                    <v-card-text>
                        <h3 class="font-weight-light font-italic mb-2">The number of days you have created a booking for</h3>
                        <h2>
                            <count-up :end-val="yourDaysBooked" duration="4"></count-up>
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title class="font-weight-medium pb-0">Cancelled Bookings</v-card-title>
                    <v-card-text>
                        <h3 class="font-weight-light font-italic mb-2">The total number of bookings you have cancelled</h3>
                        <h2>
                            <count-up :end-val="yourCancelledBookings" duration="4"></count-up>
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title class="font-weight-medium pb-0">Booking Time</v-card-title>
                    <v-card-text>
                        <h3 class="font-weight-light font-italic mb-2">The total duration your bookings have covered</h3>
                        <h2 style="display: flex; align-items: baseline;">
                            <count-up :end-val="yourBookingTime" duration="4"></count-up>&nbsp;Minutes
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-row class="mt-0 mb-2 d-flex justify-center">
                <v-col cols="12" sm="6">
                    <v-card>
                        <v-card-title class="font-weight-medium pb-0">Days Since Joined</v-card-title>
                        <v-card-text>
                            <h3 class="font-weight-light font-italic mb-2">The number of days since you've joined Simcoe Signout</h3>
                            <h2>
                                <count-up :end-val="yourDaysSinceJoining" duration="4"></count-up>
                            </h2>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import CountUp from 'vue-countup-v3'
import { wrappedStore } from '@/stores/WrappedService';
export default {
    components: {
        CountUp,
    },
    data() {
        return {
            wrapped: wrappedStore(),
            globalBookingsMade: 0,
            globalDaysBooked: 0,
            globalBookingTime: 0,
            globalNewUsers: 0,
            globalCancelledBookings: 0,

            yourBookingsMade: 0,
            yourDaysBooked: 0,
            yourCancelledBookings: 0,
            yourBookingTime: 0,
            yourDaysSinceJoining: 0,
        };
    },
    async mounted() {
        this.globalBookingsMade = await this.wrapped.fetchGlobalBookingsCount();
        this.globalDaysBooked = await this.wrapped.fetchGlobalDaysBooked();
        this.globalBookingTime = await this.wrapped.fetchGlobalBookingTime();
        this.globalNewUsers = await this.wrapped.fetchGlobalUsersCount();

        this.yourBookingsMade = await this.wrapped.fetchPersonalBookingsCount();
        this.yourDaysBooked = await this.wrapped.fetchPersonalDaysBooked();
        this.yourCancelledBookings = await this.wrapped.fetchPersonalCancelledBookingsCount();
        this.yourBookingTime = await this.wrapped.fetchPersonalBookingTime();
        this.yourDaysSinceJoining = await this.wrapped.fetchPersonalDaysSinceJoined();
    }
};
</script>