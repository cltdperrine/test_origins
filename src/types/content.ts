export interface ContentItem {
    id: string;
    type: string;
    title: string;
    slug: string;
    image?: {
        url: string;
    };
    images?: {
        main?: {
            url: string;
        }
    }
}

export interface Section {
    type: string;
    id: string;
    items?: ContentItem[];
}