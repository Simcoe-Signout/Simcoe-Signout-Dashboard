<template>
    <v-card class="category-card">
        <v-list density="compact">
            <v-list-subheader>Categories</v-list-subheader>

            <v-list-item v-for="(category, i) in categories" :key="i" :value="category" active-color="primary" class="category-item">

                <v-list-item-title v-text="category.text"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        // This will soon all be grabbed by the DB (except the All category)
        categories: [
            { text: 'All' },
            { text: 'Category 1' },
            { text: 'Category 2' },
        ],
    }),
}
</script>

<style>
.category-card {
    position: absolute;
    max-width: 230px;
    margin-top: 20px;
}

.category-item {
    padding-right: 40px;
}
</style>