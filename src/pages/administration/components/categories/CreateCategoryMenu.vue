<template>
    <v-menu v-model="createCategoryMenuOpen" :close-on-content-click="false" location="end">
        <!-- Create category button creation -->
        <template v-slot:activator="{ props }">
            <v-btn variant="outlined" color="blue" class="ml-10 mb-3 mt-5" prepend-icon="mdi-plus" v-bind="props">
                Create Category
            </v-btn>
        </template>

        <v-card min-width="300">
            <h2 class="ml-4 mt-2 mb-2">Create Category</h2>
            <v-divider />

            <v-expand-transition>
                <v-card>
                    <v-text-field class="ml-2 mr-2" v-model="title" label="Category Title" />
                    <v-text-field class="ml-2 mr-2" v-model="description" label="Category Description" />
                </v-card>
            </v-expand-transition>

            <!-- These are buttons/actions you can press/execute that are displayed on the bottom of the card -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="white" variant="text" @click="createCategoryMenuOpen = false; clearInputs()">
                    Cancel
                </v-btn>
                <v-btn color="blue" variant="text" @click="createCategoryMenuOpen = false; createCategory()">
                    Create
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import { categoriesStore } from '@/stores/CategoriesService';
export default {
    data() {
        return {
            categoriesStore: categoriesStore(),
            createCategoryMenuOpen: false,
            title: '',
            description: ''
        }
    },
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    methods: {
        /**
         * Creates a category and clears inputs
         */
        createCategory() {
            if (this.title) {
                this.categoriesStore.createCategory({ title: this.title, description: this.description});
                this.categories.push({ title: this.title, description: this.description, deleted: false });
                this.clearInputs();
            }
        },
        /**
         * Clears all variables related to the creation of a category
         */
        clearInputs() {
            this.title = '';
            this.description = '';
        }
    }
}
</script>