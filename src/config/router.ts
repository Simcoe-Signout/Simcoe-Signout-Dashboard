import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

import Home from '@pages/home/index.vue';
import LoginPage from '@pages/login/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'Default',
    }
  },
  {
    path: '/login',
    name: 'login',
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
