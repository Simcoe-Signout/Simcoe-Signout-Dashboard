<template>
    <v-menu v-model="filterMenuOpen" :close-on-content-click="false" location="end">
        <!-- Add filter button creation -->
        <template v-slot:activator="{ props }">
            <v-btn variant="outlined" color="blue" class="mb-3 mt-2" prepend-icon="mdi-plus" v-bind="props">
                Add Filter
            </v-btn>
        </template>

        <v-card min-width="300">
            <!-- Navigation buttons -->
            <v-list>
                <v-btn @click="activeFilterTab = 'categories'" variant="text">Categories</v-btn>
                <v-btn @click="activeFilterTab = 'dateRange'" variant="text">Date Range</v-btn>
                <v-btn @click="activeFilterTab = 'availability'" variant="text">Availability</v-btn>
            </v-list>
            <v-divider />

            <!-- Categories tab -->
            <v-expand-transition>
                <v-card v-if="activeFilterTab === 'categories'" class="v-card--reveal">
                    <v-checkbox hide-details density="comfortable" v-for="(category, i) in store.getCategories" :key="i"
                        :value="category" :label="category" v-model="store.filteredCategories" @change='store.fetchResources(store.filteredDate)'></v-checkbox>
                </v-card>
            </v-expand-transition>

            <!-- Date range tab -->
            <v-expand-transition>
                <v-card v-if="activeFilterTab === 'dateRange'" class="v-card--reveal">
                    <v-text-field type="date" label="Start Date"></v-text-field>
                    <v-text-field type="date" label="End Date"></v-text-field>
                </v-card>
            </v-expand-transition>

            <!-- Availability tab -->
            <v-expand-transition>
                <v-card v-if="activeFilterTab === 'availability'" class="v-card--reveal">
                    <v-checkbox hide-details density="comfortable" v-for="(availability, i) in store.getAvailabilityTypes"
                        :key="i" :value="availability" :label="availability"
                        v-model="store.filteredAvailabilityTypes"></v-checkbox>
                </v-card>
            </v-expand-transition>

            <!-- These are buttons/actions you can press/execute that are displayed on the bottom of the card -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" variant="text" @click="filterMenuOpen = false">
                    Done
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import { resourcesPageStore } from '@/stores/resources';

export default {
    data() {
        return {
            store: resourcesPageStore(),
            filterMenuOpen: false,
            activeFilterTab: 'categories',
        }
    },
}
</script>

<style>
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>
