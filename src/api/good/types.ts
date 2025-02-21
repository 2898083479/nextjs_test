export interface searchBody {
    id: string;
    filter: {
        search: string;
    }
}

export interface GoodResponse {
    name: string;
    source: string;
    category: string;
    price: number;
    createdAt: string;
}