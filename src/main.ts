import { createApp } from 'vue';
import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

// Pages
import HomePage from '@pgs/HomePage.vue';

const pinia = createPinia();

// Create the router enpoints/routes
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
];

// Initialize the router
const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app
    .use(pinia)
    .use(VueSidebarMenu)
    .use(router)
    .mount('#app');