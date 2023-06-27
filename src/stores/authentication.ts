import { defineStore } from 'pinia'

export const authenticationStore = defineStore({
    id: 'authentication',
    state: () => ({
        api_uri: 'http://localhost:3000/users',
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
            this.userRole = data.role;
            localStorage.setItem('userRole', data.role);
            
            return data;
        },
        async getAllUsers() {
            if (this.userRole !== 'administrator') {
                throw console.warn('User does not have permission to access this resource');
            }

            const response = await fetch(`${this.api_uri}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json()
            return data;
        },
        setUserID(id: number) {
            this.userID = id;
            localStorage.setItem('userID', id.toString());
        }
    },
})