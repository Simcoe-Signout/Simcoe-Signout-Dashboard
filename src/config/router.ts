import { createRouter, RouteConfig, createWebHistory } from 'vue-router';

import Home from '@pages/home/index.vue';
import LoginPage from '@pages/login/index.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login', // Provide a unique name for the route
    component: LoginPage, // Use a unique name for the component
    meta: {
      layout: 'login',
    },
  },
];

const router = new createRouter({
  history: createWebHistory(),
  routes
});

export default router