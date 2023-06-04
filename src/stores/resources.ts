import { defineStore } from 'pinia'
const resources = localStorage.getItem('resources');
const parsedResources = resources ? JSON.parse(resources) : [];

export const resourcesPageStore = defineStore({
    id: 'resources',
    state: () => ({
        categories: [
            'Category 1',
            'Category 2',
        ],
        filteredCategories: [] as string[],
        availabilityTypes: [
            'Available',
            'Unavailable',
        ],
        filteredAvailabilityTypes: [] as string[],
        resources: Array.isArray(parsedResources) ? parsedResources : [] as Resource[]
    }),
    getters: {
        getCategories: (state) => state.categories,
        getFilteredCategories: (state) => state.filteredCategories,
        getAvailabilityTypes: (state) => state.availabilityTypes,
        getFilteredAvailabilityTypes: (state) => state.filteredAvailabilityTypes,
        getResources: (state) => state.resources,
        getResource: (state) => (uuid: string) => {
            return state.resources.find((r: { uuid: string; }) => r.uuid === uuid);
        },
        getResourceUUID: (state) => (name: string) => {
            const resource = state.resources.find((r: { name: string; }) => r.name === name);
            return resource ? resource.uuid : '';
        },
        getResourcesByFilteredCategories: (state) => {
            if (state.filteredCategories.length === 0) {
                return state.resources;
            } else {
                return state.resources.filter((r) =>
                    state.filteredCategories.includes(r.category)
                );
            }
        },
        getResourcesByCategories: (state) => (categories: string[]) => {
            if (categories.includes('All')) {
                return state.resources;
            } else {
                return state.resources.filter((r: { category: string; }) => categories.includes(r.category));
            }
        },
        hasResource: (state) => (uuid: string) => {
            return state.resources.some((r: { uuid: string; }) => r.uuid === uuid);
        }
    },
    actions: {
        setFilteredCategories(categories: string[]) {
            this.filteredCategories = categories;
        },
        setFilteredAvailabilityTypes(availabilityTypes: string[]) {
            this.filteredAvailabilityTypes = availabilityTypes;
        },
        removeCategoryFilter(category: string) {
            this.filteredCategories = this.filteredCategories.filter(c => !c.includes(category));
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