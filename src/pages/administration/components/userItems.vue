<template>
    <v-row class="ml-10 mt-2">
        <v-col v-for="(user, i) in pagedUsers" :key="user.id" cols="12" sm="6" md="4" lg="3" class="px-0 user-column">
            <v-row no-gutters class="align-center">
                <v-sheet rounded="xl" class="d-flex flex-wrap text-wrap text-left px-3 mt-5 mr-5" max-width="410"
                    width="100%">
                    <div class="ml-2 mb-2 text-wrap">
                        <v-row no-gutters>
                            <v-avatar color="grey-darken-3 mt-3" :image="user.avatar_url" />
                            <h2 class="mt-4 ml-4">{{ user.full_name }}</h2>
                        </v-row>
                        <h3 class="mt-1 font-weight-bold">{{ user.email }}</h3>
                        <h2 class="mt-3 font-weight-bold">Google UID: <span class="font-weight-light">{{ user.uid }}</span>
                        </h2>

                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" class="mt-2" color="green" variant="outlined">
                                    <v-icon class="mr-2">mdi-update</v-icon>
                                    <h3>Update Role</h3>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item v-for="(role, i) in roles" :key="i" :value="i"
                                    @click="openConfirmationPopup(user, role.name)">
                                    <v-list-item-title>{{ role.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                        <!-- Roles -->
                        <h2 v-if="user.role === 'administrator'" class="mt-3 red-text">Administrator (ID: {{ user.id }})
                        </h2>
                        <h2 v-else class="mt-3 blue-text">Member (ID: {{ user.id }})</h2>

                        <h5>Created {{ getISO8601Date(user.created_at) }} at {{ getISO8601Time(user.created_at) }}</h5>
                    </div>
                </v-sheet>

                <v-dialog v-model="showConfirmationDialog" max-width="500">
                    <v-card>
                        <v-card-title class="headline">Set Role Confirmation</v-card-title>
                        <v-card-text>
                            <p>Are you sure you want to set {{ selectedUser.full_name }}'s role to:</p>
                            <h2>{{ selectedRole }}</h2>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" text @click="hidePopup">Cancel</v-btn>
                            <v-btn color="green" text @click="confirmRoleUpdate">Confirm</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-col>
    </v-row>

    <v-pagination class="mt-10" v-model="pageNo" :length="numPages"></v-pagination>
</template>
  
<script>
import { authenticationStore } from '@/stores/authentication';

export default {
    data() {
        return {
            roles: [
                { name: 'administrator' },
                { name: 'member' },
            ],
            users: [],
            authenticationStore: authenticationStore(),
            showConfirmationDialog: false,
            selectedUser: null,
            selectedRole: '',
            pageNo: 1,
            usersPerPage: 12,
        };
    },
    methods: {
        async getAllUsers() {
            await this.authenticationStore.getAllUsers();
            this.users = this.authenticationStore.users;
        },
        getISO8601Date(date) {
            return new Date(date).toISOString().slice(0, 10);
        },
        getISO8601Time(date) {
            return new Date(date).toISOString().slice(11, 16);
        },
        openConfirmationPopup(user, role) {
            this.selectedUser = user;
            this.selectedRole = role;
            this.showConfirmationDialog = true;
        },
        hidePopup() {
            this.showConfirmationDialog = false;
        },
        async confirmRoleUpdate() {
            this.authenticationStore.updateUser(
                this.selectedUser.id,
                {
                    full_name: this.selectedUser.full_name,
                    email: this.selectedUser.email,
                    role: this.selectedRole,
                    avatar_url: this.selectedUser.avatar_url,
                },
                this.$cookies.get('auth_token')
            );
            this.hidePopup();
            this.getAllUsers();
        },
    },
    computed: {
        numPages() {
            return Math.ceil(this.users.length / this.usersPerPage);
        },
        pagedUsers() {
            const startIndex = (this.pageNo - 1) * this.usersPerPage;
            const endIndex = startIndex + this.usersPerPage;
            
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            
            return this.users.slice(startIndex, endIndex);
        }
    },
    async mounted() {
        await this.getAllUsers();
    },
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
  