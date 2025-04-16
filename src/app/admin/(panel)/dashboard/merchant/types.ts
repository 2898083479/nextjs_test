export enum MerchantStatus {
    Inactive = '未激活',
    Pending = '待審核',
    Approved = '已批准',
    Rejected = '已拒絕',
}

export interface Merchant {
    merchantId: string;
    avatar: string;
    identity: number;
    storeId: string;
    name: string;
    email: string;
    password: string;
    status: MerchantStatus;
    createdAt: string;
    updatedAt: string;
}
