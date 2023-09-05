import { defineStore } from 'pinia'

export const categoriesStore = defineStore({
    id: 'categories',
    state: () => ({
        api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : 'https://api.simcoesignout.com'}/api/core/categories`,
        admin_api_uri: `${import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3000' : 'https://api.simcoesignout.com'}/api/admin/categories`,
        categories: [] as Category[],
        categoryNames: [] as string[],
    }),
    getters: {
        getCategories: (state) => state.categories,
        getCategoryNames: (state) => state.categoryNames,
    },
    actions: {
        async fetchCategoriesAdmin() {
            const res = await fetch(`${this.admin_api_uri}`, {
                method: 'GET',
                credentials: 'include'
            })
            this.categories = await res.json();
        },
        async fetchCategoriesCore() {
            const res = await fetch(`${this.api_uri}`, {
                method: 'GET',
                credentials: 'include'
            })
            this.categories = await res.json();
        },
        async fetchCategoryNames() {
            const res = await fetch(`${this.api_uri}`, {
                method: 'GET',
                credentials: 'include'
            })
            const categories = await res.json();

            this.categoryNames = categories.map((category: Category) => {
                return category.title;
            });
        },
        async createCategory(category: Category) {
            const res = await fetch(this.admin_api_uri, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: {
                    title: category.title,
                    description: category.description
                }})
            });

            const data: Category = await res.json();

            this.categories = this.categories.concat(data);
        },
        async updateCategory(id: number, category: Category) {
            const res = await fetch(`${this.admin_api_uri}/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: {
                    title: category.title,
                    description: category.description,
                    id: id
                }})
            });

            let data = await res.json();

            const resourceIndex = this.categories.findIndex(category => category.id === id);
            this.categories[resourceIndex] = data;
        },
        async deleteCategory(id: number) {
            await fetch(`${this.admin_api_uri}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            this.categories = this.categories.filter(resource => resource.id !== id);
        },
    }
})