import { IResponse, getReq, putReq } from "../index"
import { ResponseStatusCode } from "../types"
import { faker } from "@faker-js/faker";
import { MerchantInfo, SearchBody, AddMerchantBody, EditMerchantBody } from "./types";
import { MerchantStatus } from "@/app/admin/(panel)/dashboard/merchant/types";

export const getMerchantInfo = async (body: SearchBody): Promise<IResponse & {data: MerchantInfo[]}> => {
    // const response = await getReq({
    //     path: "/merchants/info",
    //     params: body,
    // })
    // return response.data;

    await new Promise(resolve => setTimeout(resolve, 3000))
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "operating successfully",
        data: Array.from({length: faker.number.int({min: 10, max: 20})}, () => {
            return {
                id: faker.string.uuid(),
                email: faker.internet.email(),
                name: faker.person.fullName(),
                store: faker.company.name(),
                status: faker.helpers.enumValue(MerchantStatus),
                createdAt: faker.date.recent().toISOString(),
            }
        })
    }
}

export const addMerchant = async (body: AddMerchantBody): Promise<IResponse> => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "operating successfully",
    }
}

export const editMerchant = async (body: EditMerchantBody): Promise<IResponse> => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "operating successfully",
    }
}