<template>
    <v-menu v-model="tagMenuOpen" :close-on-content-click="false" location="end">
        <!-- Add Tag button creation -->
        <template v-slot:activator="{ props }">
            <v-btn variant="outlined" color="blue" class="mb-3 mt-2" prepend-icon="mdi-plus" v-bind="props">
                Add Tag
            </v-btn>
        </template>

        <v-card min-width="300">
            <h2 class="ml-4 mt-2 mb-2">Create Tag</h2>
            <v-divider />

            <!-- Categories tab -->
            <v-expand-transition>
                <v-card>
                    <v-text-field class="ml-2 mr-2" v-model="tagName" label="Tag Name" />
                    <v-select class="ml-2 mr-2" v-model="tagColour" :items="tagColours" label="Tag Colour"></v-select>
                    <v-menu :tagColour="tagColour">
                        <v-list>
                            <v-list-item v-for="(item, index) in items" :key="index">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card>
            </v-expand-transition>

            <!-- These are buttons/actions you can press/execute that are displayed on the bottom of the card -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="white" variant="text" @click="tagMenuOpen = false; clearInputs()">
                    Cancel
                </v-btn>
                <v-btn color="blue" variant="text" @click="tagMenuOpen = false; createTag()">
                    Create
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    data() {
        return {
            tagMenuOpen: false,
            tagColour: '',
            tagName: null,
            tagColours: ['White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange', 'Grey'],
        }
    },
    props: {
        tagsArray: {
            type: Array,
            required: true
        }
    },
    methods: {
        /**
         * Creates a tag and adds it to the tags array, clears input as well
         */
        createTag() {
            if (this.tagName) {
                this.tagsArray.push({ text: this.tagName, colour: this.tagColour.toLowerCase() });
                this.clearInputs();
            }
        },
        /**
         * Clears all variables related to the creation of a tag
         */
        clearInputs() {
            this.tagName = null;
            this.tagColour = '';
        }
    }
}
</script>