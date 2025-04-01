import { PolicyStatus } from "@/app/admin/(panel)/dashboard/policy/types";

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

export interface createPolicyBody {
    name: string;
    status: PolicyStatus;
    description: string;
    startAt: string;
    endAt: string;
}

export interface updatePolicyBody {
    name: string;
    description: string;
    startAt: string;
    endAt: string;
}