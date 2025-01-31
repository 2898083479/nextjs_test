export enum StoreStatus {
    Pending = "待审核",
    Approved = "已批准",
    Rejected = "已拒绝",
}

export interface Store {
    name: string;
    merchantCount: number;
    status: StoreStatus;
    createdAt: string;
}
