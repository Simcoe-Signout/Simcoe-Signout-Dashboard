import router from '@/config/router';
import jwt_decode from 'jwt-decode';
import { defineStore } from 'pinia';

export const authenticationStore = defineStore({
    id: 'authentication',
    state: () => ({
        api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : 'https://api.simcoesignout.com'}/api/core/users`,
        admin_api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : 'https://api.simcoesignout.com'}/api/admin/users`,
        users: [],
    }),
    actions: {
        decodeJWT(jwt: string) {
          // decalre the type of the decoded JWT as string and use it
          // to return the decoded JWT
          interface DecodedJWT {
            user_id: number;
            user_role: string;
            user_email: string;
            exp: number;
          }

          var decodedJWT = jwt_decode<DecodedJWT>(jwt);
          return decodedJWT;
        },
        async getAllUsers() {
            const response = await fetch(`${this.admin_api_uri}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json()
            this.users = data;
            return data;
        },
        async requestUserData(auth_token: string) {
          if (!auth_token) {
            console.log('No auth token found')
            return null;
          }
      
          try {
            const decodedJwt = this.decodeJWT(auth_token);
            const response = await fetch(`${this.admin_api_uri}/${decodedJwt.user_id}`, {
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
        async requestMyUserData(auth_token: string) {
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
            await fetch(`${this.admin_api_uri}/${id}`, {
              method: 'PUT',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ user: {
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                avatar_url: user.avatar_url,
              }})
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