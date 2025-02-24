export enum PolicyStatus {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
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