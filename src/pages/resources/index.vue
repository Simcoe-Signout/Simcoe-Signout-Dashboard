<template>
  <v-row no-gutters class="mt-3">
    <!-- <v-col cols="2" class="category-column" id="category-column">
      <h1>Booking</h1>
      <CategoryList />
    </v-col> -->
    <v-col class="booking-column ml-10">
      <!-- Filter goes here -->
      <FilterButton />
      <!-- All active filters will go here -->
      <div>
        <v-chip v-for="(category, i) in store.filteredCategories" @click:close="removeCategoryFilter(category)" :key="i"
          class="mb-3 mr-2" color="white">
          {{ category }}
        </v-chip>
      </div>
      <!-- <div class="filtered-categories">
        Filtered Categories:
        <span v-for="(category, i) in store.filteredCategories" :key="i">
          {{ category }}
          <template v-if="i !== store.getFilteredCategories.length - 1">, </template>
        </span>
      </div> -->

      <v-row no-gutters class="date-row">
        <h1>{{ formattedDate }}</h1>
      </v-row>
      <v-row no-gutters class="button-row">
        <v-btn @click="createResource">
          <v-icon>mdi-less-than</v-icon>
        </v-btn>
        <v-btn class="ml-2" @click="clearResources">
          <v-icon>mdi-greater-than</v-icon>
        </v-btn>
        <v-btn class="ml-6">
          TODAY
        </v-btn>
      </v-row>
      <ResourceItems />
    </v-col>
  </v-row>
</template>
  
<script>
import CategoryList from '@/pages/resources/components/categoryList.vue';
import ResourceItems from '@/pages/resources/components/resourceItems.vue';
import FilterButton from '@/pages/resources/components/filterButton.vue';
import { resourcesPageStore } from '@/stores/resources';

export default {
  data() {
    return {
      date: new Date(),
      store: resourcesPageStore(),
    };
  },
  methods: {
    createResource() {
      const store = resourcesPageStore();
      store.createResource({
        uuid: "beans",
        name: "Beans",
        description: "Beans",
        category: "Category 2",
        location: "Beans",
        tags: [
          {
            name: "Beans",
            colour: "red"
          },
          {
            name: "Beans2",
            colour: "yellow"
          },
          {
            name: "Beans3",
            colour: "blue"
          },
          {
            name: "Beans4",
            colour: "green"
          }
        ]
      });
    },
    clearResources() {
      this.store.clearResources();
    },
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
    formattedDate() {
      return this.date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
      });
    }
  },
  components: {
    CategoryList,
    ResourceItems,
    FilterButton,
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
  