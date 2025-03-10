export enum StoreStatus {
    Pending = "待審核",
    Approved = "已批准",
    Rejected = "已拒絕",
}

export interface Store {
    storeId: string;
    name: string;
    email: string;
    merchant_count: number;
    good_count: number;
    status: StoreStatus;
    description: string;
    createAt: string;
}
