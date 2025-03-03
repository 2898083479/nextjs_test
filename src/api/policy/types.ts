export interface PolicyResponse {
    id: string;
    name: string;
    status: string;
    description: string;
    startAt: string;
    endAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface policyBody {
    goodId?: string;
    filter?: {
        name: string;
    }
}
