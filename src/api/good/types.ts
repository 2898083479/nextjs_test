export interface searchBody {
    storeId?: string;
    filter: {
        search?: string;
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
}

export interface updateGoodBody {
    goodId: string;
    name: string;
    source: string;
    category: string;
    price: number;
    count: number;
}