import { ShoppingCarResponse } from "./types";
import { faker } from "@faker-js/faker";
import { ResponseStatusCode } from "../types";
import { IResponse } from "../index";
export const getShoppingCarList = async (): Promise<IResponse & { data: ShoppingCarResponse[] }> => {

    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
        data: Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => {
            return {
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseFloat(faker.commerce.price()),
                quantity: faker.number.int({min: 1, max: 10}),
                ownerId: faker.string.uuid(),
                addTime: faker.date.recent().toISOString().split('T')[0],
            }
        })
    }
}

export const clearShoppingCarAPI = async (id: string): Promise<IResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
    }
}