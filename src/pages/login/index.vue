<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <h1 class="text-center pt-15">
          <h2>Login</h2>
        </h1>

        <h2 class="text-center font-weight-light pt-12">A booking program for schools to book computer devices, rooms, and
          resources.</h2>
        <googleLoginButton class="mt-15" :click="openGoogleLoginPopup" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import googleLoginButton from '@components/authentication/googleLoginButton.vue';
import { authenticationStore } from '@/stores/authentication.ts';

export default {
  name: 'Login',
  data() {
    return {
      myData: null,
      authentication: authenticationStore(),
    };
  },
  components: {
    googleLoginButton
  },
  methods: {
    openGoogleLoginPopup() {
      var popup = window.open(`${process.env.VITE_API_URI}/users/auth/google_oauth2`, '_blank', 'width=600,height=600');

      const handleMessage = async (event) => {
        const authToken = this.$cookies.get('auth_token');
        if (authToken) {

          window.removeEventListener('message', handleMessage);

          this.$router.push({ name: 'Home' });
        } else {
          console.error("Auth token is missing.");
        }
      };

      window.addEventListener('message', handleMessage);
    },
  },
};
</script>