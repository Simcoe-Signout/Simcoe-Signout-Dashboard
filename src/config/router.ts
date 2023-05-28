import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

import Home from '@pages/home/index.vue';
import LoginPage from '@pages/login/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      layout: 'login',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
