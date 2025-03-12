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
    policyId: string;
    name: string;
    description: string;
    startAt: string;
    endAt: string;
}