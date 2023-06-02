import { defineStore } from 'pinia'
const resources = localStorage.getItem('resources');
const parsedResources = resources ? JSON.parse(resources) : [];

const currentCategory = localStorage.getItem('currentCategory');
const parsedCurrentCategory = currentCategory ? JSON.parse(currentCategory) : 'All';

export const resourcesPageStore = defineStore({
    id: 'resources',
    state: () => ({
        currentCategory: parsedCurrentCategory,
        resources: Array.isArray(parsedResources) ? parsedResources : [] as Resource[]
    }),
    getters: {
        getCategory: (state) => state.currentCategory,
        getResources: (state) => state.resources,
        getResource: (state) => (uuid: string) => {
            return state.resources.find((r: { uuid: string; }) => r.uuid === uuid);
        },
        getResourceUUID: (state) => (name: string) => {
            const resource = state.resources.find((r: { name: string; }) => r.name === name);
            return resource ? resource.uuid : '';
        },
        getResourcesByCategory: (state) => (category: string) => {
            if (category === 'All') {
                return state.resources;
            } else {
                return state.resources.filter((r: { category: string; }) => r.category === category);
            }
        },
        hasResource: (state) => (uuid: string) => {
            return state.resources.some((r: { uuid: string; }) => r.uuid === uuid);
        }
    },
    actions: {
        setCategory(category: string) {
            this.currentCategory = category;
            localStorage.setItem('currentCategory', JSON.stringify(category));
        },
        createResource(resource: Resource) {
            this.resources.push(resource);
            localStorage.setItem('resources', JSON.stringify(this.resources));
        },
        updateResource(uuid: string, updates: Partial<Resource>) {
            const resource = this.resources.find((r: { uuid: string; }) => r.uuid === uuid);
            if (resource) {
                Object.assign(resource, updates);
                localStorage.setItem('resources', JSON.stringify(this.resources));
            }
        },
        deleteResource(uuid: string) {
            const resourceIndex = this.resources.findIndex((r: { uuid: string; }) => r.uuid === uuid);
            if (resourceIndex !== -1) {
                this.resources.splice(resourceIndex, 1);
                localStorage.setItem('resources', JSON.stringify(this.resources));
            }
        },
        clearResources() {
            this.resources = [];
            localStorage.setItem('resources', JSON.stringify(this.resources));
        }
    }
})