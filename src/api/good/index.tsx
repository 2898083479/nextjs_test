import { IResponse, getReq } from "../index";
import { searchBody, GoodResponse, buyBody } from "./types";
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
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                source: faker.location.city(),
                category: faker.helpers.enumValue(GoodCategory),
                price: faker.number.int({min: 100, max: 1000}),
                count: faker.number.int({min: 10, max: 100}),
                createdAt: faker.date.anytime().toLocaleString(),
                updatedAt: faker.date.anytime().toLocaleString(),
                policys: Array.from({length: faker.number.int({min: 1, max: 3})}, () => faker.lorem.word())
            }
        })
    }
}

export const buyGoodAPI = async (body: buyBody): Promise<IResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // return {
    //     category: "00",
    //     code: ResponseStatusCode.error,
    //     message: "商品庫存不足，可以挑選其他商品～",
    // }
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
    }
}

export const addGoodToShoppingCarAPI = async (): Promise<IResponse> => {
    return await new Promise((resolve) => setTimeout(resolve, 1000));
}