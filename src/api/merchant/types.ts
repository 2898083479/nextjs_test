export interface MerchantInfo {
    id: string;
    email: string;
    name: string;
    store: string;
    status: string;
    createdAt: string;
}

export interface SearchBody {
    id: string; // merchant id
    filter: {
        search: string; // 搜索
    }
}

export interface AddMerchantBody {
    name: string;
    email: string;
}

export interface EditMerchantBody {
    id: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
}