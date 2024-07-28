import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import Home from '@pages/home/HomeView.vue';
import LoginPage from '@pages/login/LoginView.vue';
import Resources from '@pages/resources/ResourcesView.vue';
import EditResources from '@pages/administration/EditResourcesView.vue';
import ManageUsers from '@pages/administration/ManageUsersView.vue';
import ManageBookings from '@pages/administration/ManageBookingsView.vue';
import Categories from '@pages/administration/EditCategoriesView.vue';
import Wrapped from '@pages/wrapped/WrappedView.vue';

import { authenticationStore } from '@/stores/AuthenticationService';
import { VueCookies } from 'vue-cookies';
import { inject } from 'vue';
import myBookings from '@pages/account/MyBookingsView.vue';

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
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: {
      requiredRole: 'administrator'
    }
  },
  // Account related routes (login, my resource bookings, etc.)
  {
    path: '/login',
    name: 'Logout',
    component: LoginPage,
    meta: {
      layout: 'login',
      logout: true
    },
  },
  {
    path: '/my-bookings',
    name: 'My Bookings',
    component: myBookings,
    meta: {
      requiredRole: 'member'
    }
  },
  {
    path: '/wrapped',
    name: 'Wrapped',
    component: Wrapped,
    meta: {
      requiredRole: 'member',
      hidden: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const authentication = authenticationStore();
  const $cookies = inject<VueCookies>('$cookies'); 

  if (!$cookies || await $cookies.get('auth_token') === undefined || await $cookies.get('auth_token') === null) {
    // Check the name of the route the user is trying to navigate to
    if (to.name !== 'Logout') {
      // If the route is not 'Logout', redirect the user to the 'Logout' route
      const loginpath = window.location.pathname;
      next({ name: 'Logout', query: { redirect: loginpath } });
    } else {
      // If the route is 'Logout', allow the navigation to proceed
      next();
    }
  } else {
    // If they're logging out, delete JWT and move to logout
    if (to.meta.logout) {
      $cookies?.remove('auth_token');
      next();
    }

    const authToken = await $cookies.get('auth_token');
    const decodedJWT = authentication.decodeJWT(authToken);
    if (decodedJWT.user_role === 'administrator') {
      // If the user is an administrator, allow access to any route
      next();
    } else if (decodedJWT.user_role === 'member' && to.meta.requiredRole === 'administrator') {
      // If the user is a member and the required role is administrator, redirect to the 'Home' route
      next({ name: 'Home' });
    } else if (to.meta.hidden || routes.find(route => route.path === to.path) === undefined) {
      // If the route doesn't exist or the route is hiden, just go to the home page
      next({ name: 'Home' });
    } else {
      // For all other cases, allow access to the route
      next();
    }
  }
});

export default router;
