export interface searchBody {
    id: string;
    filter: {
        search: string;
    }
}

export interface GoodResponse {
    id: string;
    name: string;
    source: string;
    category: string;
    price: number;
    count: number;
    policys: string[];
    createdAt: string;
    updatedAt: string;
}