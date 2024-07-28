<template>
  <component :is="layout" />

  <v-snackbar
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    class="text-center"
  >
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue';
import LoginLayout from '@/layouts/Login.vue';

const fallbackLayout = 'Default';

export default {
  name: 'App',
  components: { DefaultLayout, LoginLayout },
  data () {
    return {
      snackbar: {
        message: '',
        timeout: 5000,
        visible: false
      }
    };
  },
  computed: {
    layout() {
      const loadedLayout = (this.$route?.meta?.layout || fallbackLayout);
      return `${loadedLayout}-layout`;
    }
  },
  mounted () {
    window.addEventListener('display-snackbar-message', (event) => {
      this.snackbar.message = event.detail.message;
      this.snackbar.visible = true;
    });
  }
};
</script>
