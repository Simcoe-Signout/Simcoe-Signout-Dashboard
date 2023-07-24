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
import VueJwtDecode from 'vue-jwt-decode';
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
      var popup = window.open('http://127.0.0.1:3000/users/auth/google_oauth2', '_blank', 'width=600,height=600');

      const handleMessage = async (event) => {
        const authToken = this.$cookies.get('auth_token');
        if (authToken) {
          const decoded_token = VueJwtDecode.decode(authToken);
          this.authentication.setUserID(decoded_token.user_id);

          this.myData = await this.authentication.requestUserData();

          window.removeEventListener('message', handleMessage);

          this.$router.push({ name: 'Home' });
        } else {
          console.error("Auth token is missing.");
        }
      };

      window.addEventListener('message', handleMessage);
    },
  },
  async mounted() {
    if (this.$cookies.get('auth_token') != null) {
      this.myData = await this.authentication.requestUserData();
    }
  }
};
</script>