import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

import Home from '@pages/home/index.vue';
import LoginPage from '@pages/login/index.vue';
import Resources from '@pages/resources/index.vue';
import EditResources from '@pages/administration/index.vue';

const routes: RouteRecordRaw[] = [
  // "publicly" accessible routes (google authentication required (dsbn.org))
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources,
  },
  // Administration only routes (developers and managers)
  {
    path: '/manage-users',
    name: 'Manage Users',
    component: Home,
  },
  {
    path: '/edit-resources',
    name: 'Edit Resources',
    component: EditResources,
  },
  {
    path: '/manage-bookings',
    name: 'Bookings',
    component: Home,
  },
  // Account related routes (login, my resource bookings, etc.)
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
