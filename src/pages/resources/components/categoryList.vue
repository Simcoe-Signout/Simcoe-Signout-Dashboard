<template>
    <v-card class="category-card" rounded>
        <v-list density="compact">
            <v-list-subheader>Categories</v-list-subheader>
            <v-list-item v-for="(category, i) in store.getFilteredCategories" :key="i" :value="category" color="primary"
                class="category-item" @click="store.setCategory(category.text)">
                <v-list-item-title v-text="category.text"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>
  
<script>
import { resourcesPageStore } from '@/stores/resources';

export default {
    data() {
        return {
            store: resourcesPageStore(),
        };
    },
};
</script>
  
<style>
.category-card {
    max-width: 230px;
    margin-top: 20px;
}

.category-item {
    padding-right: 40px;
}
</style>
  