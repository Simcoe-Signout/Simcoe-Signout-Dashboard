<template>
  <v-row class="ml-1 mt-2">
    <v-col v-for="(resource, i) in availableResources" :key="resource.id" cols="12" sm="6" md="4" lg="3" class="px-0 resource-column">
      <v-row no-gutters class="align-center">
        <v-sheet rounded="xl" class="d-flex flex-wrap text-wrap text-left px-3 mt-5 mr-5" max-width="350" width="100%">
          <div class="ml-2 mb-2 text-wrap">
            <h2 class="mt-2">{{ resource.name }}</h2>
            <div class="text-h6 font-weight-medium">
              {{ resource.description }}
            </div>
            <h3 class="mt-2">Location: {{ resource.location }}</h3>
            <div>
              <v-chip v-for="tag in getTags(resource)" class="mt-2 mr-2" :color="tag.colour">
                {{ tag.text }}
              </v-chip>
            </div>
              <BookingMenu :index="i" :resource="resource"/>
          </div>
        </v-sheet>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { resourcesPageStore } from '@/stores/resources';
import BookingMenu from './bookingMenu.vue';

export default {
  data() {
    return {
      resourceStore: resourcesPageStore(),
    };
  },
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    availableResources() {
      const isoDate = this.date.toISOString().slice(0, 10);
      return this.resourceStore.getAvailableResourcesOnDate(isoDate);
    },
  },
  methods: {
    /**
     * Retrieves, parses, and returns the tags of a resource
     * @param resource The resource to retrieve the tags of (this parses them correctly)
     */
    getTags(resource) {
      const parsedTagsArray = resource.tags.map(item => {
        const jsonItem = item.replace(/=>/g, ":");
        return eval("(" + jsonItem + ")");
      });
      return parsedTagsArray;
    },
  },
  components: { BookingMenu },
};
</script>

<style>
.text-wrap {
  word-break: break-word;
}
</style>