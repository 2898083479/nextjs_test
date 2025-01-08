export enum AdminStatus {
    Inactive = 0,
    Pending = 1,
    Approved = 2,
    Rejected = 3,
}

export interface Admin {
    name: string;
    goodAmount: number;
    status: number;
    createdAt: string;
}
