<template>
    <v-row>
        <v-col cols="12" class="resource-column">
            <v-card>
                <v-card-title>
                    <h1>Create a Resource</h1>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="name" label="Name" required></v-text-field>
                        <v-text-field v-model="description" label="Description" required></v-text-field>
                        <v-text-field v-model="category" label="Category" required></v-text-field>
                        <v-text-field v-model="location" label="Location" required></v-text-field>
                        <v-text-field v-model="tags" label="Tags" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn href="/resources" @click="createResource">Create</v-btn>
                    <v-btn @click="">Clear</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { resourcesPageStore } from '@/stores/resources';

export default {
    data: () => {
        return {
            name: null,
            description: null,
            category: null,
            location: null,
            tags: null,
            store: resourcesPageStore()
        }
    },
    methods: {
        clearInput() {
            this.name = null;
            this.description = null;
            this.category = null;
            this.location = null;
            this.tags = null;
        },
        createResource() {
            this.store.createResource({
                uuid: 'args',
                name: this.name,
                description: this.description,
                category: this.category,
                location: this.location,
                tags: this.tags
            })
        }
    }
}
</script>