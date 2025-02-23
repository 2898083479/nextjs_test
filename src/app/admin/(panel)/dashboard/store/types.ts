export enum StoreStatus {
    Pending = "待审核",
    Approved = "已批准",
    Rejected = "已拒绝",
}

export interface Store {
    id: string;
    name: string;
    email: string;
    merchantCount: number;
    goodCount: number;
    status: StoreStatus;
    createdAt: string;
}
