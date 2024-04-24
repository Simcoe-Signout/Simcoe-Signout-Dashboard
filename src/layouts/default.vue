<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <template v-for="routeCategory in routeCategories" :key="routeCategory.header">
        <sidebarHeader :name="routeCategory.header" />
        <v-item-group>
          <template v-for="route in routeCategory.routes" :key="route.name">
            <v-list-item>
              <sidebarIcon :icon="route.icon" />
              <sidebarItem :name="route.route.name" :href="route.route.path" />
            </v-list-item>
          </template>
        </v-item-group>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Simcoe Signout</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-alert @click:close="storeWrappedClose" v-if="$route.path !== '/wrapped' && $route.path !== '/login' && this.wrappedBanner" closable
        icon="mdi-gift" text="Wow! What a year is was, let's look back on what happend. Shall we? " type="info"><a
          href="/wrapped">Check out Simcoe Signout Wrapped</a></v-alert>
      <!-- <v-alert closable icon="mdi-gift" text="Wow! What a year is was, let's look back on what happend. Shall we? " type="info"><a href="/wrapped">Check out Simcoe Signout Wrapped</a></v-alert> -->
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
import router from '@/config/router';
import sidebarIcon from '@components/sidebar/sidebarIcon.vue';
import sidebarItem from '@components/sidebar/sidebarItem.vue';
import sidebarHeader from '@components/sidebar/sidebarHeader.vue';
import { authenticationStore } from '@/stores/authentication.ts';

export default {
  name: 'DefaultLayout',
  components: { sidebarIcon, sidebarItem, sidebarHeader },
  data() {
    return {
      drawer: null,
      routes: router.getRoutes(),
      authenticationStore: authenticationStore(),
      wrappedBanner: true,
    };
  },
  methods: {
    storeWrappedClose() {
      localStorage
        .setItem("wrappedBanner", false);
        this.getWrappedBannerStatus();
    },
    storeWrappedOpen() {
      localStorage
        .setItem("wrappedBanner", true);
        this.getWrappedBannerStatus();
    },
    isWrappedOpen() {
      this.getWrappedBannerStatus();
      return this.wrappedBanner;
    },
    getWrappedBannerStatus() {
      const wrappedBanner = localStorage.getItem("wrappedBanner");
      this.wrappedBanner = wrappedBanner === "true";
    }
  },
  computed: {

    // Returns the routes with their respective categories
    // When adding more routes, be sure to add the route into the category here
    routeCategories() {
      const categories = [
        {
          header: 'Simcoe Signout',
          routes: [
            { route: this.routes[0], icon: 'mdi-home' },
            { route: this.routes[1], icon: 'mdi-database' },
            { route: this.routes[8], icon: 'mdi-gift' },
          ],
        },
        {
          header: 'Administration',
          routes: [
            { route: this.routes[2], icon: 'mdi-lock' },
            { route: this.routes[3], icon: 'mdi-cog' },
            { route: this.routes[4], icon: 'mdi-book-lock-open-outline' },
            { route: this.routes[5], icon: 'mdi-format-list-bulleted' },
          ],
        },
        {
          header: 'My Account',
          routes: [
            { route: this.routes[6], icon: 'mdi-account-circle' },
            { route: this.routes[7], icon: 'mdi-book-account-outline' },
            { route: { name: 'Report a Bug', path: 'https://docs.google.com/forms/d/e/1FAIpQLSeX6b22OVFhMCx0Lzsmivbm3YesxD9d513ULRLmxzron_UWMA/viewform' }, icon: 'mdi-bug' }
          ],
        },
      ];

      const authToken = this.$cookies.get('auth_token');
      const decodedJWT = this.authenticationStore.decodeJWT(authToken);
      // Remove the 'Administration' category if isLoggedInAsAdmin is false
      if (decodedJWT.user_role !== 'administrator') {
        const adminCategoryIndex = categories.findIndex(category => category.header === 'Administration');
        if (adminCategoryIndex !== -1) {
          categories.splice(adminCategoryIndex, 1);
        }
      }

      return categories;
    },
  },
  created() {
    if (localStorage.getItem("wrappedBanner") === null) {
      this.storeWrappedOpen();
    }
    this.getWrappedBannerStatus();
  },
};
</script>

<style>
a {
  color: inherit;
}
</style>