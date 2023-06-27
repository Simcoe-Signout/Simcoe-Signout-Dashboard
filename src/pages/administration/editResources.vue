<template>
    <v-row class="ml-3 mt-2">
        <v-col cols="12" class="resource-column">
            <v-card>

                <v-card-title>
                    <h1 v-if="isEditingResource">Edit Resource</h1>
                    <h1 v-else>Create a Resource</h1>
                </v-card-title>

                <v-card-text class="pb-1">
                    <v-form>
                        <!-- Other fields -->
                        <v-text-field v-model="resourceName" label="Name" required />
                        <v-text-field v-model="resourceDescription" label="Description" required />
                        <v-select v-model="resourceCategory" :items="store.getCategories" label="Category" />
                        <v-text-field v-model="resourceLocation" label="Location" required />

                        <!-- Tags -->
                        <TagButton v-bind:tags-array="tagsArray" />
                        <div>
                            <v-chip v-for="tag in tagsArray" :key="tag" :color="tag.colour.toLowerCase()" closable
                                @click:close="removeTag(tag)" class="mr-2">
                                {{ tag.text }}
                            </v-chip>
                        </div>

                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <!-- Depending on if they're editing or creating, how the proper button -->
                    <v-btn v-if="isEditingResource" @click="updateResource(currentlyEditingResource)">Update</v-btn>
                    <v-btn v-else @click="createResource">Create</v-btn>
                    <v-btn @click="clearInput">Clear</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <!-- Shows the list of resources available to edit or delete -->
        <v-row class="ml-3 mt-2">
            <v-col v-for="(resource, i) in store.getResourcesByFilteredCategories" :key="i" cols="12" sm="6" md="4" lg="3"
                class="resource-column">
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

                        <!-- Action related buttons, these should only be shown to administrators -->
                        <v-row class="mb-1 mt-3 ml-1">
                            <v-btn class="mr-6" color="blue" variant="outlined" @click="editResource(resource)">
                                <v-icon class="mr-3">mdi-pencil</v-icon>
                                <h3>Edit</h3>
                            </v-btn>
                            <v-btn color="red" variant="elevated" @click="store.deleteResource(resource.id)">
                                <v-icon class="mr-3">mdi-delete</v-icon>
                                <h3>Delete</h3>
                            </v-btn>
                        </v-row>

                    </div>
                </v-sheet>
            </v-col>
        </v-row>

    </v-row>
</template>

<script>
import { resourcesPageStore } from '@/stores/resources';
import TagButton from './components/tagButton.vue';

export default {
    components: {
        TagButton
    },
    data: () => {
        return {
            // Resource related
            resourceName: null,
            resourceDescription: null,
            resourceCategory: null,
            resourceLocation: null,

            isEditingResource: false,
            currentlyEditingResource: null,
            tagMenuOpen: false,
            tagsArray: [],
            store: resourcesPageStore()
        }
    },
    methods: {
        /**
         * Sets all of the resource vairables back to null
         */
        clearInput() {
            this.resourceName = null;
            this.resourceDescription = null;
            this.resourceCategory = null;
            this.resourceLocation = null;
            this.tagsArray = [];
            this.isEditingResource = false;
            this.currentlyEditingResource = null;
        },
        /**
         * Creates a resource with the supplied information
         */
        createResource() {
            this.store.createResource({
                resourceName: this.resourceName,
                resourceDescription: this.resourceDescription,
                resourceLocation: this.resourceLocation,
                resourceTags: this.tagsArray,
                resourceCategory: this.resourceCategory
        });

            this.clearInput();
        },
        /**
         * Starts the editing process for a resource
         * @param resource The resource to edit
         */
        editResource(resource) {
            this.resourceName = resource.name;
            this.resourceDescription = resource.description;
            this.resourceCategory = resource.category;
            this.resourceLocation = resource.location;
            this.tagsArray = this.getTags(resource);
            this.isEditingResource = true;
            this.currentlyEditingResource = resource;

            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        /**
         * Updates a resource with the supplied information
         * @param resource The resource to update
         */
        updateResource(resource) {
            this.store.updateResource(
                resource.id,
                {
                    resourceName: this.resourceName,
                    resourceDescription: this.resourceDescription,
                    resourceLocation: this.resourceLocation,
                    resourceTags: this.tagsArray,
                    resourceCategory: this.resourceCategory
                });

            this.clearInput();
        },
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
        },
        /**
         * Removes a tag from the tags array
         * @param tag The tag to remove
         */
        removeTag(tag) {
            const index = this.tagsArray.findIndex(item => item === tag);
            if (index !== -1) {
                this.tagsArray.splice(index, 1);
            }
        }
    },
    /**
     * Fetches all resources when this page is mounted
     */
    mounted() {
        this.store.fetchResources();
    }
}
</script>

<style>
.text-wrap {
    word-break: break-word;
}
</style>