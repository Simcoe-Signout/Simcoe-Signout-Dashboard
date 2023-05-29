<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <template v-for="routeCategory in routeCategories" :key="routeCategory.header">
        <SidebarHeader :name="routeCategory.header" />
        <v-list-item-group>
          <template v-for="route in routeCategory.routes" :key="route.name">
            <v-list-item>
              <v-icon class="sidebar-item-icon">{{ route.icon }}</v-icon> <!-- Add the icon here -->
              <SidebarItem :name="route.route.name" :href="route.route.path" />
            </v-list-item>
          </template>
        </v-list-item-group>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Governor Simcoe Resource Bookings</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
import router from '@/config/router';
import SidebarItem from '@components/navigation/SidebarItem.vue';
import SidebarHeader from '@/components/navigation/SidebarHeader.vue';

export default {
  name: 'DefaultLayout',
  components: { SidebarItem, SidebarHeader },
  data() {
    return {
      drawer: null,
      routes: router.getRoutes(),
    };
  },
  computed: {
    // Returns the routes with their respective categories
    routeCategories() {
      return [
        {
          header: 'Simcoe Resource Booking',
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
          ],
        },
        {
          header: 'My Account',
          routes: [
            { route: this.routes[4], icon: 'mdi-account-circle' },
            { route: this.routes[5], icon: 'mdi-calendar-multiselect' },
          ],
        },
      ];
    },
  },
};
</script>

<style>
.sidebar-item-icon {
  margin-right: 30px;
  margin-bottom: 5px;
}
</style>