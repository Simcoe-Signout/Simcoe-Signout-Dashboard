interface Resource {
    resourceName: string;
    resourceDescription: string;
    resourceLocation: string;
    resourceCategory: string;
    categoryId: number;
    resourceTags: Tag[];
}