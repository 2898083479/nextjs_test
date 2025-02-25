export enum PolicyStatus {
    ACTIVE = "啟用",
    DISABLED = "未啟用",
}

export interface Policy {
    id: string;
    name: string;
    status: PolicyStatus;
    startAt: string;
    endAt: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}