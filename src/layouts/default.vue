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

      <v-toolbar-title>DSBN Resources Booking</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
import router from '@/config/router';
import sidebarIcon from '@components/sidebar/sidebarIcon.vue';
import sidebarItem from '@components/sidebar/sidebarItem.vue';
import sidebarHeader from '@components/sidebar/sidebarHeader.vue';
import { authenticationStore } from '@/stores/authentication.ts'

export default {
  name: 'DefaultLayout',
  components: { sidebarIcon, sidebarItem, sidebarHeader },
  data() {
    return {
      drawer: null,
      routes: router.getRoutes(),
      authenticationStore: authenticationStore(),
    };
  },
  async created() {
    await this.authenticationStore.requestUserData(); // Fetch user data on component creation
  },
  computed: {
    async userRole() {
      return this.authenticationStore.getUserRole();
    },
    // Returns the routes with their respective categories
    async routeCategories() {
      const categories = [
        {
          header: 'DSBN Resources Booking',
          routes: [
            { route: this.routes[0], icon: 'mdi-home' },
            { route: this.routes[1], icon: 'mdi-database' },
          ],
        },
        {
          header: 'Administration',
          routes: [
            { route: this.routes[2], icon: 'mdi-lock' },
            { route: this.routes[3], icon: 'mdi-cog' },
            { route: this.routes[4], icon: 'mdi-book-lock-open-outline' },
          ],
        },
        {
          header: 'My Account',
          routes: [
            { route: this.routes[5], icon: 'mdi-account-circle' },
          ],
        },
      ];

      // Remove the 'Administration' category if the user's role isn't administrator
      if (this.userRole !== 'administrator') {
        return categories.filter(category => category.header !== 'Administration');
      }

      return categories;
    },
  },
};
</script>