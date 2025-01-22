export enum AdminStatus {
    Inactive = '未激活',
    Pending = '待审核',
    Approved = '已批准',
    Rejected = '已拒绝',
}

export interface Admin {
    name: string;
    email: string;
    status: AdminStatus;
    createdAt: string;
}
