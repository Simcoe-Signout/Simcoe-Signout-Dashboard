import router from '@/config/router';
import VueJwtDecode from 'vue-jwt-decode';
import { VueCookies } from 'vue-cookies';
import { defineStore } from 'pinia';
import { inject } from 'vue';
const $cookies = inject<VueCookies>('$cookies'); 

export const authenticationStore = defineStore({
    id: 'authentication',
    state: () => ({
        api_uri: 'https://simcoe-signout-api.ian-tapply.me/users',
    }),
    actions: {
        decodeJWT(jwt: string) {
            return VueJwtDecode.decode(jwt);
        },
        async requestUserData() {

            const response = await fetch(`${this.api_uri}/${this.decodeJWT($cookies?.get('auth_token')).user_id}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json()

            return data;
        },
        async getAllUsers() {
            const response = await fetch(`${this.api_uri}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json()
            return data;
        },
        updateUser(id: number, user: User) {
            fetch(`${this.api_uri}/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role,
                    uid: user.uid,
                    avatar_url: user.avatar_url,
                })
            })

            if (id === this.decodeJWT($cookies?.get('auth_token')).user_id) {
                if (user.role === 'member') {
                    router.push({ name: 'Home' });
                }
            }
        }
    },
})