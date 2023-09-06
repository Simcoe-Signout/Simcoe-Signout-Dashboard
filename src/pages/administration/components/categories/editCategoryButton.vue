<template>
    <v-menu v-model="createCategoryMenuOpen" :close-on-content-click="false" location="end">
        <!-- Create category button creation -->
        <template v-slot:activator="{ props }">
            <v-btn variant="outlined" color="blue" class="ml-10 mb-3 mt-5" prepend-icon="mdi-delete" v-bind="props">
                Edit Category
            </v-btn>
        </template>

        <v-card min-width="300">
            <h2 class="ml-4 mt-2 mb-2">Edit Category</h2>
            <v-divider />

            <v-expand-transition>
                <v-card>
                    <v-text-field class="ml-2 mr-2" v-model="editedTitle" label="Category Title" />
                    <v-text-field class="ml-2 mr-2" v-model="editedDescription" label="Category Description" />
                </v-card>
            </v-expand-transition>

            <!-- These are buttons/actions you can press/execute that are displayed on the bottom of the card -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="white" variant="text" @click="createCategoryMenuOpen = false; clearInputs()">
                    Cancel
                </v-btn>
                <v-btn color="blue" variant="text" @click="createCategoryMenuOpen = false; updateCategory()">
                    Done
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import { categoriesStore } from '@/stores/categories';
export default {
    data() {
        return {
            categoriesStore: categoriesStore(),
            createCategoryMenuOpen: false,
            editedTitle: this.title,
            editedDescription: this.title
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        categories: {
            type: Array,
            required: true
        }
    },
    methods: {
        /**
         * Creates a category and clears inputs
         */
        updateCategory() {
            if (this.editedTitle) {
                this.categoriesStore.updateCategory(this.id, { title: this.editedTitle, description: this.editedDescription })
                this.categories.push({ title: this.teditedTitle, description: this.editedDescription });
                this.clearInputs();
            }
        },
        /**
         * Clears all variables related to the updating of a category
         */
        clearInputs() {
            this.editedTitle = '';
            this.editedDescription = '';
        }
    }
}
</script>