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
        <v-btn>
          <v-icon>mdi-less-than</v-icon>
        </v-btn>
        <v-btn class="ml-2">
          <v-icon>mdi-greater-than</v-icon>
        </v-btn>
        <v-btn class="ml-6">
          TODAY
        </v-btn>
      </v-row>
      <resourceItems />
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
     * Creates an example resource
     * Removing functionality as it's testing
     */
    // createExampleResource() {
    //   this.store.createResource("Math Tote", "A tote filled with chromebooks that belongs to the math department. This is an example description that is longer.", "Location", [
    //     { text: "Tote", colour: "orange" },
    //     { text: "Math Department", colour: "blue" },
    //     { text: "Beans", colour: "yellow" },
    //     { text: "Beans", colour: "white" },
    //     { text: "Beans", colour: "purple" },
    //   ], "Category 1");
    // },
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
  