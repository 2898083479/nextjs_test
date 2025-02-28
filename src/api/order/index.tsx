import { IResponse } from "../index";
import { OrderResponse } from "./types";
import { ResponseStatusCode } from "../types";
import { faker } from "@faker-js/faker";

export const getOrderList = async (): Promise<IResponse & { data: OrderResponse[] }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        category: '00',
        code: ResponseStatusCode.success,
        message: 'success',
        data: Array.from({length: faker.number.int({min: 10, max: 20})}).map(() => ({
            id: faker.string.uuid(),
            ownerId: faker.string.uuid(),
            goodName: faker.commerce.productName(),
            totalPrice: parseFloat(faker.commerce.price({min: 100, max: 1000})),
            orderCreateTime: faker.date.recent().toISOString(),
        })),
    }
}
