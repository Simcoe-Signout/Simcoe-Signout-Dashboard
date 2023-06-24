<template>
    <h1>Ian wuz here lol beans</h1>
    <googleLoginButton :click="openGoogleLoginPopup" />

    <h2>Your token: {{ token }}</h2>
</template>
  
<script>
import googleLoginButton from '@components/authentication/googleLoginButton.vue';
export default {
    name: 'Home',
    data() {
        return {
            token: null,
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
            });

            var intervalId = setInterval(() => {
                if (popup.closed) {
                    clearInterval(intervalId);
                }
            }, 500);
        },
    },
};
</script>
  