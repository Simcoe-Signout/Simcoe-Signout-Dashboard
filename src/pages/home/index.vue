<template>
    <h1>Ian wuz here lol beans</h1>
    <googleLoginButton class="mt-5" :click="openGoogleLoginPopup" />

    <h2 class="mt-5 mb-5">Your token: {{ token }}</h2>
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
export default {
    name: 'Home',
    data() {
        return {
            token: null,
            myData: null
        };
    },
    components: {
        googleLoginButton
    },
    methods: {
        openGoogleLoginPopup() {
            var popup = window.open('http://127.0.0.1:3000/users/auth/google_oauth2', '_blank', 'width=600,height=600');

            window.addEventListener('message', (event) => {
                this.token = event.data.auth_token;
                this.requestData();
            });

            var intervalId = setInterval(() => {
                if (popup.closed) {
                    clearInterval(intervalId);
                }
            }, 500);
        },
        async requestData() {
            const decoded_token = VueJwtDecode.decode(this.token);
            const res = await fetch(`http://127.0.0.1:3000/users/${decoded_token.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${this.token}`
                },
            });

            const data = await res.json();

            this.myData = data;
        }
    },
};
</script>
  