<template>
    <v-col cols="12" class="px-0 resource-column">
        <v-sheet v-for="(resource, i) in store.getResourcesByFilteredCategories" :key="i" rounded="xl"
            class="d-flex flex-wrap text-left px-3 mt-5" max-width="350" width="100%">
            <div class="ml-2 mb-2">

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
            </div>
        </v-sheet>
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
            if (typeof resource.tags === 'string') {
                try {
                    const tagsArray = JSON.parse(resource.tags.replace(/"=>"/g, '":"').replace(/"/g, '"'));
                    return tagsArray.map(tag => ({ text: tag.text, colour: tag.colour }));
                } catch (error) {
                    console.error('Error parsing tags:', error);
                    return [];
                }
            } else {
                return [];
            }
        }
    },
};
</script>
  