<template>
    <v-table class="ml-10 mt-6 mr-10 rounded">
        <thead>
            <tr>
                <th class="text-left text-h5">
                    Title
                </th>
                <th class="text-left text-h5">
                    Description
                </th>
                <th class="text-left text-h5">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="category in categories" :key="category.title">
                <td>{{ category.title }}</td>
                <td>{{ category.description }}</td>
                <td>
                    <v-btn color="red" class="mr-2" @click="deleteCategory(category.id)">
                        <v-icon>mdi-delete</v-icon> Delete
                    </v-btn>
                    <v-btn color="blue" class="ml-5 mr-2" @click="editCategory(category.id)">
                        <v-icon>mdi-pencil</v-icon> Edit
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>

    <createCategoryButton :categories="categories"/>
</template>
  
<script>
import { categoriesStore } from '@/stores/categories.ts'
import createCategoryButton from './createCategoryButton.vue'
export default {
    data() {
        return {
            categories: [],
            categoriesStore: categoriesStore()
        }
    },
    components: {
        createCategoryButton
    },
    methods: {
        async deleteCategory(id) {
            await this.categoriesStore.deleteCategory(id);
            await this.categoriesStore.fetchCategoriesAdmin();
            this.categories = this.categoriesStore.getCategories;
        }
    },
    async mounted() {
        await this.categoriesStore.fetchCategoriesAdmin();
        this.categories = this.categoriesStore.getCategories;
    }
}
</script>