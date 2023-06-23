<template>
    <h1>Ian wuz here lol beans</h1>
    <button @click="openGoogleLoginPopup">Login with Google</button>
</template>

<script>

export default {

    name: 'Home',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        async openGoogleLoginPopup() {
            var popup = window.open('http://127.0.0.1:3000/users/auth/google_oauth2', '_blank', 'width=600,height=600');

            // Listen for messages from the popup window
            window.addEventListener('message', function (event) {
                // Check if the message is from the popup window
                if (event.source === popup) {
                    // Capture the JSON message and do something with it
                    var data = JSON.parse(event.data);
                    console.log(data);
                    // Close the popup window
                    popup.close();
                }
            });
        },
    }
}
</script>
