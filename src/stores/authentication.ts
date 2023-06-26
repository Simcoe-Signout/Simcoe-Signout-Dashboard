import { defineStore } from 'pinia'

export const authenticationStore = defineStore({
    id: 'authentication',
    state: () => ({
        api_uri: 'http://[::1]:3000//users',
        token: null,
    }),
    getters: {
        // TODO
    },
    actions: {
        // TODO
    },
})