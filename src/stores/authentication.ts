import router from '@/config/router';
import { defineStore } from 'pinia'

export const authenticationStore = defineStore({
    id: 'authentication',
    state: () => ({
        api_uri: 'https://simcoe-signout-api.ian-tapply.me/users',
        userID: parseInt(localStorage.getItem('userID') || '0', 10),
        userRole: localStorage.getItem('userRole') || null,
    }),
    getters: {
        // TODO
        getUserID: (state) => state.userID,
        getUserRole: (state) => state.userRole,
    },
    actions: {
        // TODO
        async requestUserData() {
            if (this.userID === 0) {
                throw console.warn('User ID not set. Value is 0');
            }

            if (this.userID === null) {
                throw console.warn('User ID not set. Value is null??');
            }

            const response = await fetch(`${this.api_uri}/${this.userID}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json()
            this.setUserRole(data.role);

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

            if (id === this.userID) {
                this.setUserRole(user.role);
                if (user.role === 'member') {
                    router.push({ name: 'Home' });
                }
            }
        },
        setUserID(id: number) {
            this.userID = id;
            localStorage.setItem('userID', id.toString());
        },
        setUserRole(role: string) {
            this.userRole = role;
            localStorage.setItem('userRole', role);
        }
    },
})