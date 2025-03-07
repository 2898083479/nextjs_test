export enum MerchantStatus {
    Inactive = '未激活',
    Pending = '待审核',
    Approved = '已批准',
    Rejected = '已拒绝',
}

export interface Merchant {
    id: string;
    identity: number;
    storeId: string;
    name: string;
    email: string;
    password: string;
    status: MerchantStatus;
    createdAt: string;
    updatedAt: string;
}
