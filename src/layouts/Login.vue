<template>
  <v-app  >
    <router-view />
  </v-app>
</template>
<script>
  export default {
    name: 'LoginLayout',
    data: () => ({ drawer: null }),
  }
</script>

