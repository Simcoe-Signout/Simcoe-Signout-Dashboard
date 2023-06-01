<template>
    <v-row no-gutters>
        <v-col cols="2" class="category-column">
            <h1>Booking</h1>
            <CategoryList />
        </v-col>
        <v-col class="booking-column">
            <li class="selected-category">
                Selected Category
            </li>
            <h1>{{ new Date().getDate() }}</h1>
        </v-col>
    </v-row>
</template>
  
<script>
import CategoryList from './components/CategoryList.vue';

export default {
    components: {
        CategoryList,
    },
};
</script>
  
<style>
.category-column {
    margin-left: 20px;
}

.selected-category {
    color: grey;
    display: flex;
    align-items: center;
    flex: 1;
    flex-grow: 1;
    font-weight: bold;
    margin-top: 60px;
  }
</style>
  