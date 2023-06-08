<template>
  <v-col v-for="(resource, i) in store.getResourcesByFilteredCategories" :key="i" cols="12" class="px-0 resource-column">
    <v-row no-gutters class="align-center">
      <v-sheet rounded="xl" class="d-flex flex-wrap text-wrap text-left px-3 mt-5" max-width="350" width="100%">
        <div class="ml-2 mb-2 text-wrap">

          <h3 class="mt-2">{{ resource.name }}</h3>

          <div class="text-h7 font-weight-medium">
            {{ resource.description }}
          </div>

          <h3 class="mt-2">Location: {{ resource.location }}</h3>

          <div>
            <v-chip v-for="tag in getTags(resource)" class="mt-2 mr-2" :color="tag.colour">
              {{ tag.text }}
            </v-chip>
          </div>
          <v-btn class="mt-3 mb-1" color="green" variant="outlined">
            <v-icon class="mr-3">mdi-book-open-page-variant</v-icon>
            <h3>Book Resource</h3>
          </v-btn>
        </div>
      </v-sheet>
    </v-row>
  </v-col>
</template>
  
<script>
import { resourcesPageStore } from '@/stores/resources';

export default {
  data() {
    return {
      store: resourcesPageStore(),
    };
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

      return parsedTagsArray
    }
  },
};
</script>
  
<style>
.text-wrap {
  word-break: break-word;
}
</style>