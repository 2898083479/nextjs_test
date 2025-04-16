export interface MerchantResponse {
    id: string;
    storeId: string;
    avatar: string;
    email: string;
    name: string;
    status: string;
    createdAt: string;
}

export interface SearchBody {
    search?: string;
}

export interface AddMerchantBody {
    name: string;
    email: string;
}

export interface EditMerchantBody {
    merchantId: string;
    name: string;
    email: string;
    status?: string;
}