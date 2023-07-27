import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
//import { authenticationStore } from '@/stores/authentication.ts';

import Home from '@pages/home/index.vue';
import LoginPage from '@pages/login/index.vue';
import Resources from '@pages/resources/index.vue';
import EditResources from '@pages/administration/editResources.vue';
import ManageUsers from '@pages/administration/manageUsers.vue';
import ManageBookings from '@pages/administration/manageBookings.vue';
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
    component: ManageUsers,
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
    component: ManageBookings,
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

router.beforeEach(async (to, _, next) => {
  const authentication = authenticationStore();
  const $cookies = inject<VueCookies>('$cookies'); 
  const userData = await authentication.requestUserData();

  if (!$cookies || $cookies.get('auth_token') === undefined || $cookies.get('auth_token') === null) {
    to.name !== 'Login' ? next({ name: 'Login' }) : next();
  } else {
    if (userData.role === 'administrator') {
      // If the user is an administrator, allow access to any route
      next();
    } else if (userData.role === 'member' && to.meta.requiredRole === 'administrator') {
      // If the user is a member and the required role is administrator, redirect to the 'Home' route
      next({ name: 'Home' });
    } else {
      // For all other cases, allow access to the route
      next();
    }
  }
});

export default router;
