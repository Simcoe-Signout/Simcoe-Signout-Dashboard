<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <h1 class="text-center pt-15">
          <h2>Login</h2>
        </h1>

        <h2 class="text-center font-weight-light pt-12">A private, bookings manager used to book DSBN devices, tools, and
          other resources through an online dashboard.</h2>
        <googleLoginButton class="mt-15" :click="openGoogleLoginPopup" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import googleLoginButton from '@components/authentication/googleLoginButton.vue';
import VueJwtDecode from 'vue-jwt-decode'
import { authenticationStore } from '@/stores/authentication.ts'
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
      var popup = window.open('http://localhost:3000/users/auth/google_oauth2', '_blank', 'width=600,height=600');

      const handleMessage = async (event) => {
        const decoded_token = VueJwtDecode.decode(this.$cookies.get('auth_token'));
        this.authentication.setUserID(decoded_token.user_id);

        this.myData = await this.authentication.requestUserData();

        window.removeEventListener('message', handleMessage);

        // NAvigate the user to the home page
        this.$router.push({ name: 'Home' });
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
<!-- <template>
  <h1>Ian wuz here lol beans</h1>
  <googleLoginButton class="mt-5" :click="openGoogleLoginPopup" />

   <h2 class="mt-5 mb-5">Your token: {{ token }}</h2>
  <h2>Stored Token: {{ this.$cookies.get('auth_token') }}</h2>
  <div>
    <div v-if="myData != null && myData.full_name != null">
      <h2>Name: {{ myData.full_name }}</h2>
      <h2>Email: {{ myData.email }}</h2>
      <h2>Role: {{ myData.role }}</h2>
      <h2>Google UID: {{ myData.uid }}</h2>
    </div>
    <h2 v-else>Data not requested! Token and data is null.</h2>
  </div>
</template>

<script>
import googleLoginButton from '@components/authentication/googleLoginButton.vue';
import VueJwtDecode from 'vue-jwt-decode'
import { authenticationStore } from '@/stores/authentication.ts'
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
      var popup = window.open('http://localhost:3000/users/auth/google_oauth2', '_blank', 'width=600,height=600');

      const handleMessage = async (event) => {
        const decoded_token = VueJwtDecode.decode(this.$cookies.get('auth_token'));
        this.authentication.setUserID(decoded_token.user_id);

        this.myData = await this.authentication.requestUserData();

        window.removeEventListener('message', handleMessage);

        // NAvigate the user to the home page
        this.$router.push({ name: 'Home' });
      };

      window.addEventListener('message', handleMessage);
    },
  },
  async mounted()  {
    if (this.$cookies.get('auth_token') != null) {
      this.myData = await this.authentication.requestUserData();
    }
  }
};
</script> -->