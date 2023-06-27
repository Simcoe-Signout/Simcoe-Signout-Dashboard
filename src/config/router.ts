import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
//import { authenticationStore } from '@/stores/authentication.ts';

import Home from '@pages/home/index.vue';
import LoginPage from '@pages/login/index.vue';
import Resources from '@pages/resources/index.vue';
import EditResources from '@pages/administration/index.vue';
import { authenticationStore } from '@/stores/authentication';
import { VueCookies } from 'vue-cookies';
import { inject } from 'vue';

const routes: RouteRecordRaw[] = [
  // "publicly" accessible routes (google authentication required (dsbn.org))
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiredRole: 'member'
    }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources,
    meta: {
      requiredRole: 'member'
    }
  },
  // Administration only routes (developers and managers)
  {
    path: '/manage-users',
    name: 'Manage Users',
    component: Home,
    meta: {
      requiredRole: 'administrator'
    }
  },
  {
    path: '/edit-resources',
    name: 'Edit Resources',
    component: EditResources,
    meta: {
      requiredRole: 'administrator'
    }
  },
  {
    path: '/manage-bookings',
    name: 'Bookings',
    component: Home,
    meta: {
      requiredRole: 'administrator'
    }
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

router.beforeEach((to, from, next) => {
  //const isLoggedIn = false;
  const authentication = authenticationStore();
  const $cookies = inject<VueCookies>('$cookies'); 

  if (!$cookies || $cookies.get('auth_token') === undefined || $cookies.get('auth_token') === null) {
    to.name !== 'Login' ? next({ name: 'Login' }) : next();
  } else {
    if (authentication.userRole === 'administrator') {
      // If the user is an administrator, allow access to any route
      next();
    } else if (authentication.userRole === 'member' && to.meta.requiredRole === 'administrator') {
      // If the user is a member and the required role is administrator, redirect to the 'Home' route
      next({ name: 'Home' });
    } else {
      // For all other cases, allow access to the route
      next();
    }
  }
});

export default router;
