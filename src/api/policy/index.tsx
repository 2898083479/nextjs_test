import { IResponse, getReq } from "../index";
import { PolicyResponse } from "./types";
import { ResponseStatusCode } from "../types";
import { PolicyStatus } from "@/app/admin/(panel)/dashboard/policy/types"
import { faker } from "@faker-js/faker";
import { Policy } from "@/app/admin/(panel)/dashboard/policy/types";
export const queryPolicyList = async (): Promise<IResponse & { data: PolicyResponse[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
        data: Array.from({ length: faker.number.int({ min: 10, max: 20 }) }).map(() => ({
            id: faker.string.uuid(),
            name: faker.lorem.word(),
            status: faker.helpers.arrayElement(Object.values(PolicyStatus)),
            description: faker.lorem.sentence(),
            startAt: faker.date.past().toISOString(),
            endAt: faker.date.future().toISOString(),
            createdAt: faker.date.past().toISOString(),
            updatedAt: faker.date.future().toISOString(),
        }))
    }
}

export const updateStatusAPI = async (): Promise<IResponse> => {
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
    }
}

export const queryPolicyInfo = async (id: string): Promise<IResponse & { data: PolicyResponse }> => {
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
        data: {
            id: faker.string.uuid(),
            name: faker.lorem.word(),
            status: faker.helpers.arrayElement(Object.values(PolicyStatus)),
            description: faker.lorem.sentence(),
            startAt: faker.date.past().toISOString(),
            endAt: faker.date.future().toISOString(),
            createdAt: faker.date.past().toISOString(),
            updatedAt: faker.date.future().toISOString(),
        }
    }
}

export const updatePolicyInfo = async (data: Policy): Promise<IResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
    }
}