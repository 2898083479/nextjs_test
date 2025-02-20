export enum MerchantStatus {
    Inactive = '未激活',
    Pending = '待审核',
    Approved = '已批准',
    Rejected = '已拒绝',
}

export interface Merchant {
    id: string;
    name: string;
    email: string;
    status: MerchantStatus;
    createdAt: string;
}
