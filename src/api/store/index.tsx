import { ResponseStatusCode } from "../types";
import { IResponse } from "../index";
import { StoreInfo } from "./types";
import { StoreStatus } from "@/app/admin/(panel)/dashboard/store/types";
import { faker } from "@faker-js/faker";
interface Body {
    id?: string; // store id
    filter?: {
        search?: string; // search keyword
        merchantCount?: number; // merchant count
        goodCount?: number; // good count
    }
}

export const getStoreInfoList = async (body?: Body): Promise<IResponse & { data: StoreInfo[] }> => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "operating successfully",
        data: Array.from({length: faker.number.int({min: 10, max: 20})}, () => {
            return {
                id: faker.string.uuid(),
                name: faker.company.name(),
                email: faker.internet.email(),
                status: faker.helpers.enumValue(StoreStatus),
                ownerId: faker.string.uuid(),
                createdAt: faker.date.recent().toISOString(),
                merchantCount: faker.number.int({min: 0, max: 100}),
                goodCount: faker.number.int({min: 100, max: 1000}),
                description: faker.lorem.paragraph(),
            }
        })
    }
}