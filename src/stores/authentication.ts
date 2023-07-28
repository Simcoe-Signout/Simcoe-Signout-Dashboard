import router from '@/config/router';
import VueJwtDecode from 'vue-jwt-decode';
import { defineStore } from 'pinia';

export const authenticationStore = defineStore({
    id: 'authentication',
    state: () => ({
        api_uri: 'https://simcoe-signout-api.ian-tapply.me/users',
    }),
    actions: {
        decodeJWT(jwt: string) {
            return VueJwtDecode.decode(jwt);
        },
        async requestUserData(auth_token: string) {
          if (!auth_token) {
            console.log('No auth token found')
            return null;
          }
      
          try {
            const decodedJwt = this.decodeJWT(auth_token);
            const response = await fetch(`${this.api_uri}/${decodedJwt.user_id}`, {
              method: 'GET',
              credentials: 'include'
            });
            const data = await response.json();
            return data;
          } catch (error) {
            // Handle the case when the JWT is invalid or expired.
            console.error('Error decoding JWT:', error);
            return null;
          }
        },
        async updateUser(id: number, user: User, auth_token: string) {
      
          try {
            const decodedJwt = this.decodeJWT(auth_token);
            await fetch(`${this.api_uri}/${id}`, {
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
            });
      
            if (id === decodedJwt.user_id) {
              if (user.role === 'member') {
                router.push({ name: 'Home' });
              }
            }
          } catch (error) {
            // Handle the case when the JWT is invalid or expired.
            console.error('Error decoding JWT:', error);
          }
        }
      },      
})