interface Tag {
    name: string;
    colour: string;
}

interface Resource {
    uuid: string;
    name: string;
    description: string;
    location: string;
    tags: Tag[];
    category: string;
}