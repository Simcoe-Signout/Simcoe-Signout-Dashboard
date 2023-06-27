<template>
    <v-row class="ml-10 mt-2">
        <v-col v-for="(user, i) in users" :key="user.id" cols="12" sm="6" md="4" lg="3" class="px-0 user-column">
            <v-row no-gutters class="align-center">
                <v-sheet rounded="xl" class="d-flex flex-wrap text-wrap text-left px-3 mt-5 mr-5" max-width="350"
                    width="100%">
                    <div class="ml-2 mb-2 text-wrap">
                        <v-row no-gutters>
                            <v-avatar color="grey-darken-3 mt-3" :image="user.avatar_url" />
                            <h1 class="mt-2 ml-4">{{ user.full_name }}</h1>
                        </v-row>
                        <h2 class="mt-1 font-weight-light">{{ user.email }}</h2>
                        <h2 class="mt-3 font-weight-bold">Google UID: <span class="font-weight-light">{{ user.uid }}</span>
                        </h2>

                        <v-btn class="mt-2" color="green" variant="outlined">
                            <v-icon class="mr-2">mdi-update</v-icon>
                            <h3>Update Role</h3>
                        </v-btn>

                        <!-- Roles -->
                        <h2 v-if="user.role === 'administrator'" class="mt-3 red-text">Administrator (ID: {{ user.id }})
                        </h2>
                        <h2 v-else class="mt-3 blue-text">Member (ID: {{ user.id }})</h2>

                        <h5>Created {{ getISO8601Date(user.created_at) }} at {{ getISO8601Time(user.created_at) }}</h5>
                    </div>
                </v-sheet>
            </v-row>
        </v-col>
    </v-row>
</template>
    
<script>
import { authenticationStore } from '@/stores/authentication';

export default {
    data() {
        return {
            users: [],
            authenticationStore: authenticationStore(),
        };
    },
    methods: {
        async getAllUsers() {
            const users = await this.authenticationStore.getAllUsers();
            this.users = users;
        },
        getISO8601Date(date) {
            return new Date(date).toISOString().slice(0, 10);
        },
        getISO8601Time(date) {
            return new Date(date).toISOString().slice(11, 16);
        },
    },
    async mounted() {
        await this.getAllUsers();
    }
};
</script>
    
<style>
.text-wrap {
    word-break: break-word;
}

.red-text {
    color: #F44336;
}

.blue-text {
    color: #2196F3;
}
</style>