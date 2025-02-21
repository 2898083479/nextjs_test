import { IResponse, getReq } from "../index";
import { searchBody, GoodResponse } from "./types";
import { faker } from "@faker-js/faker";
import { GoodCategory } from "@/app/admin/(panel)/dashboard/good/types";
import { ResponseStatusCode } from "../types";
export const queryGoodList = async (body: searchBody): Promise<IResponse & {data: GoodResponse[]}> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
        data: Array.from({length: faker.number.int({min: 10, max: 20})}, () => {
            return {
                name: faker.commerce.productName(),
                source: faker.location.city(),
                category: faker.helpers.enumValue(GoodCategory),
                price: faker.number.int({min: 100, max: 1000}),
                count: faker.number.int({min: 10, max: 100}),
                createdAt: faker.date.anytime().toLocaleString(),
            }
        })
    }
}