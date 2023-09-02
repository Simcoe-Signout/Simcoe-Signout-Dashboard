<template>
  <v-row no-gutters class="mt-3">
    <v-col class="ml-10">
      <filterButton />
      <!-- All active filters will go here -->
      <div>
        <v-chip v-for="(category, i) in store.filteredCategories" @click:close="removeCategoryFilter(category)" :key="i"
          class="mb-3 mr-2" color="white">
          {{ category }}
        </v-chip>
      </div>

      <v-row no-gutters class="date-row">
        <h1>{{ formattedDate }}</h1>
      </v-row>
      <v-row no-gutters class="button-row">
        <v-btn @click="changeDate(-1)">
          <v-icon>mdi-less-than</v-icon>
        </v-btn>
        <v-btn class="ml-2" @click="changeDate(1)">
          <v-icon>mdi-greater-than</v-icon>
        </v-btn>
        <v-btn class="ml-6" @click="today">
          TODAY
        </v-btn>
      </v-row>
      <resourceItems :date="date"/>
    </v-col>
  </v-row>
</template>

<script>
import resourceItems from '@/pages/resources/components/resourceItems.vue';
import filterButton from '@/pages/resources/components/filterButton.vue';
import { resourcesPageStore } from '@/stores/resources';

export default {
  data() {
    return {
      date: new Date(),
      store: resourcesPageStore()
    };
  },
  components: {
    resourceItems,
    filterButton,
  },
  methods: {
    /**
     * Removes a category from the list of filtered categories
     * @param category The category to remove from the list of filtered categories
     */
    removeCategoryFilter(category) {
      const categoryIndex = this.store.filteredCategories.indexOf(category);
      if (categoryIndex !== -1) {
        const filteredCategories = [...this.store.filteredCategories];
        filteredCategories.splice(categoryIndex, 1);
        this.store.setFilteredCategories(filteredCategories);
      }
    },
    /**
     * Changes the current date by the specified number of days
     * @param days The number of days to change the current date by
     */
    changeDate(days) {
      const newDate = new Date(this.date.getTime() + days * 24 * 60 * 60 * 1000);
      this.store.filteredDate = newDate.toISOString().slice(0, 10);
      this.store.fetchResources(newDate.toISOString().slice(0, 10));
      this.date = newDate;
    },
    /**
     * Sets the current date to the current day
     */
    today() {
      this.date = new Date();
      this.store.filteredDate = this.date.toISOString().slice(0, 10);
      this.store.fetchResources(this.date.toISOString().slice(0, 10));
    }
  },
  computed: {
    /**
     * Returns the date in a formatted string
     */
    formattedDate() {
      return this.date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
      });
    }
  },
  /**
   * Fetches the resources from the store
   */
  mounted() {
    this.store.fetchResources();
  },
};
</script>

<style>
.category-column {
  margin-left: 30px;
  position: sticky;
  top: 0;
  z-index: 1;
}

.filtered-categories {
  color: grey;
  font-weight: bold;
}

.date-row {
  margin-top: 20px;
}

.button-row {
  margin-top: 10px;
}
</style>