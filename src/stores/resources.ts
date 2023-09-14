import { defineStore } from 'pinia'
import { bookingsStore } from './bookings';

export const resourcesPageStore = defineStore({
    id: 'resources',
    state: () => ({
        api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : 'https://api.simcoesignout.com'}/api/core/resources`,
        admin_api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : 'https://api.simcoesignout.com'}/api/admin/resources`,
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
        resources: [] as any[],
        filteredDate: new Date(),

        availablePeriods: [] as number[],

        filteredFromDate: new Date(new Date().getFullYear(), new Date().getMonth() - 2, new Date().getDate()).toISOString().slice(0, 10),
        filteredToDate: new Date().toISOString().slice(0, 10),

        resourceNames: [] as string[],
    }),
    getters: {
        getCategories: (state) => state.categories,
        getFilteredCategories: (state) => state.filteredCategories,
        getAvailabilityTypes: (state) => state.availabilityTypes,
        getFilteredAvailabilityTypes: (state) => state.filteredAvailabilityTypes,
        getResources: (state) => state.resources,
        // Returns a resource based on its ID
        getResource: (state) => (id: string) => {
            return state.resources.find((r) => r.id === id);
        },
        // Returns a resources ID based on its name
        getResourceID: (state) => (name: string) => {
            const resource = state.resources.find((r) => r.name === name);
            return resource.id ? resource.id : '';
        },
        // Returns a list of resources that have one of the filtered categories
        // If there are none, it just returns all of them
        getResourcesByFilteredCategories: (state) => {
            if (state.filteredCategories.length === 0) {
                return state.resources;
            } else {
                return state.resources.filter((r) =>
                    state.filteredCategories.includes(r.category)
                );
            }
        },
        getAvailableResourcesOnDate: (state) => (date: string) => {
            const bookingStore = bookingsStore();
            const resources = state.resources;

            const previousDate = new Date(date);
            previousDate.setDate(previousDate.getDate() - 1);

            const availableResources = resources.filter((resource: any) => {
                const bookingsOnDate = bookingStore.getBookings.filter((booking: any) => {
                    return booking.resourceName === resource.name && booking.bookingDates.some((bookingDate: any) => {
                        return bookingDate.date === previousDate.toISOString().slice(0, 10);
                    });
                });
                return bookingsOnDate.length <= 3;
            });

            return availableResources;
        }
    },
    actions: {
        // Fetches all resources from the API
        async fetchResources(date: String) {
            const res = await fetch(`${this.api_uri}?categories=${this.filteredCategories}&available_on_date=${date}`, {
                method: 'GET',
                credentials: 'include'
            })
            this.resources = await res.json();
        },
        async fetchAllResourceNames() {
            const res = await fetch(`${this.api_uri}?categories=&available_on_date=`, {
                method: 'GET',
                credentials: 'include'
            })
            const resources = await res.json();
            this.resourceNames = resources.map((resource: any) => resource.name);
        },
        async fetchAvailablePeriodsForResource(id: number) {
            const res = await fetch(`${this.api_uri}/available_periods?id=${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            const periods = await res.json();
            this.availablePeriods = periods;
        },
        setFilteredCategories(categories: string[]) {
            this.filteredCategories = categories;
            this.fetchResources(this.filteredDate.toISOString().slice(0, 10));
        },
        setFilteredAvailabilityTypes(availabilityTypes: string[]) {
            this.filteredAvailabilityTypes = availabilityTypes;
        },
        removeCategoryFilter(category: string) {
            this.filteredCategories = this.filteredCategories.filter(c => !c.includes(category));
        },
        // Adds a new resource to the API
        async createResource(resource: Resource) {
            const res = await fetch(this.admin_api_uri, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resource: {
                    name: resource.resourceName,
                    description: resource.resourceDescription,
                    location: resource.resourceLocation,
                    category: resource.resourceCategory,
                    tags: resource.resourceTags,
                }})
            });

            const data = await res.json();

            this.resources.push(data);
        },
        // Updates a resource in the API
        async updateResource(id: string, resource: Resource) {
            const res = await fetch(`${this.admin_api_uri}/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resource: {
                    name: resource.resourceName,
                    description: resource.resourceDescription,
                    location: resource.resourceLocation,
                    tags: resource.resourceTags,
                    category: resource.resourceCategory,
                    id: id
                }})
            });

            let data = await res.json();

            const resourceIndex = this.resources.findIndex(resource => resource.id === id);
            this.resources[resourceIndex] = data;
        },
        // Deletes a resource from the API
        async deleteResource(id: number) {
            await fetch(`${this.admin_api_uri}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            this.resources = this.resources.filter(resource => resource.id !== id);
        },
        // Deletes ALL resources from the API
        // USE THIS WITH CAUTION
        deleteAllResources() {
            for (const resource of this.resources) {
                this.deleteResource(resource.id);
            }
            this.resources = [];
        }
    }
})