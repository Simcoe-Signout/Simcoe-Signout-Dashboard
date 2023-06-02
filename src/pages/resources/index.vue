<template>
  <v-row no-gutters class="mt-3">
    <v-col cols="2" class="category-column" id="category-column">
      <h1>Booking</h1>
      <CategoryList />
    </v-col>
    <v-col class="booking-column">
      <div class="selected-category">
        Selected Category: {{ selectedCategory }}
      </div>
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
      <BookingTable />
    </v-col>
  </v-row>
</template>
  
<script>
import CategoryList from '@/pages/resources/components/categoryList.vue';
import BookingTable from './components/bookingTable.vue';
import { resourcesPageStore } from '@/stores/resources';

export default {
  data() {
    return {
      date: new Date(),
    };
  },
  methods: {
    createResource() {
      const store = resourcesPageStore();
      store.createResource({
        uuid: "beans",
        name: "Beans",
        description: "Beans",
        category: "Beans",
        location: "Beans",
        tags: ["Beans1", "Beans2", "Beans4"]
      });
      console.log("bonk")
    },
    clearResources() {
      const store = resourcesPageStore();
      store.clearResources();
    }
  },
  computed: {
    formattedDate() {
      return this.date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
      });
    },
    selectedCategory() {
      const resourcePageStore2 = resourcesPageStore();
      return resourcePageStore2.getCategory;
    }
  },
  components: {
    CategoryList,
    BookingTable
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

.selected-category {
  color: grey;
  font-weight: bold;
  margin-top: 60px;
}

.date-row {
  margin-top: 20px;
}

.button-row {
  margin-top: 10px;
}
</style>
  