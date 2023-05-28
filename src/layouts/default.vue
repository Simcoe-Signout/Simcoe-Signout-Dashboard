<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <li v-for="route in routes" :key="route">
        <SidebarItem :name="route.name" :href="route.path" />
      </li>
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
export default {
  name: 'DefaultLayout',
  components: { SidebarItem },
  data: () => ({ 
    drawer: null,
    routes: router.getRoutes()
  }),
}
</script>