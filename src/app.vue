<template>
  <component :is="layout" />
</template>

<script>
import DefaultLayout from '@/layouts/default';
import LoginLayout from '@/layouts/login';

const fallbackLayout = 'DefaultLayout';

export default {
  name: 'App',
  components: { DefaultLayout, LoginLayout },
  computed: {
    layout() {
      const loadedLayout = (this.$route?.meta?.layout || fallbackLayout);
      return `${loadedLayout}-layout`;
    }
  }
};
</script>
