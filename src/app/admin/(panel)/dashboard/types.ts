export enum Status {
    Pending = 0,
    Approved = 1,
    Rejected = 2,
}

export interface Admin {
    name: string;
    goodAmount: number;
    status: number;
    createdAt: string;
}
