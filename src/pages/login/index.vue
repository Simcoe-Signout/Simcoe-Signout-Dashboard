<!-- <template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-center">
            <h2>Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="Email" required type="email"></v-text-field>
              <v-text-field v-model="password" label="Password" required type="password"></v-text-field>
              <v-btn type="submit" color="primary" class="mt-4" block>
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log('Login clicked');
    },
  },
};
</script> -->
<template>
  <h1>Ian wuz here lol beans</h1>
  <googleLoginButton class="mt-5" :click="openGoogleLoginPopup" />

  <!-- <h2 class="mt-5 mb-5">Your token: {{ token }}</h2> -->
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
</script>