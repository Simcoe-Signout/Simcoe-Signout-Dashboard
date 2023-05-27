<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
     <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',
    data: () => ({ drawer: null }),
  }
</script>