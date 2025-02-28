export interface searchBody {
    id: string;
    filter: {
        search: string;
    }
}

export interface buyBody {
    goodId: string;
    quantity: number;
}

export interface addGoodToShoppingCarBody {
    goodId: string;
    quantity: number;
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