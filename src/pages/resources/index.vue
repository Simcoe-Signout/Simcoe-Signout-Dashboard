<template>
    <div class="left-column">
        <h1>Resource Booking</h1>
        <CategoryList />
    </div>
</template>

<script>
import CategoryList from './components/CategoryList.vue';

export default {
    components: {
        CategoryList,
    },
}
</script>

<style>
.left-column {
    margin-left: 50px;
}
</style>