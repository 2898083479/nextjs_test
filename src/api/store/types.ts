export interface StoreResponseInfo {
    storeId: string;
    merchantList: string[];
    goodList: string[];
    name: string;
    email: string;
    status: string;
    createAt: string;
    merchant_count: number;
    good_count: number;
}

export interface EditStoreBody {
    storeId: string;
    name: string,
    email: string,
    status: string,
    description: string,
}

export interface AddMerchantToStoreBody {
    storeId: string;
    merchantIds: string[];
}