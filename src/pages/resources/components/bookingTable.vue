<template>
    <v-col cols="12" class="px-0 resource-column">
        <v-sheet v-for="(resource, i) in store.getResourcesByCategory(store.getCategory)" :key="i" rounded="xl"
            class="d-flex flex-wrap text-left px-3 mt-5" max-width="300" width="100%">
            <div class="ml-2">
                <h3 class="mt-2">{{ resource.name }}</h3>

                <div class="text-h7 font-weight-medium">
                    {{ resource.description }}
                </div>

                <h3 class="mt-2">Location: {{ resource.location }}</h3>

                <div class="text-h7 font-weight-medium mb-2">
                    {{ resource.tags }}
                </div>
            </div>
        </v-sheet>
    </v-col>
</template>

<script>
import { resourcesPageStore } from '@/stores/resources';

export default {
    data: () => {
        return {
            store: resourcesPageStore()
        }
    }
}
</script>