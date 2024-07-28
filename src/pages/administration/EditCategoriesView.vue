<template>
    <div class="ml-10">
        <h1 class="mt-5 mb-2">Categories</h1>
        <v-divider class="mr-10"></v-divider>
    </div>
    <editCategoriesTable/>
</template>

<script>
import editCategoriesTable from './components/categories/EditCategoriesTable.vue'

export default {
    components: {
        editCategoriesTable
    }
}
</script>