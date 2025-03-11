import { IResponse, deleteReq, getReq, putReq } from "../index"
import { ResponseStatusCode } from "../types"
import { faker } from "@faker-js/faker";
import { MerchantResponse, SearchBody, AddMerchantBody, EditMerchantBody } from "./types";
import { MerchantStatus } from "@/app/admin/(panel)/dashboard/merchant/types";

export const getMerchantInfo = async (body?: SearchBody): Promise<IResponse & { data: MerchantResponse[] }> => {
    const response = await getReq({
        path: "/account/merchant/list",
        params: body,
    })
    return response.data;

    // await new Promise(resolve => setTimeout(resolve, 3000))
    // return {
    //     category: "00",
    //     code: ResponseStatusCode.success,
    //     message: "operating successfully",
    //     data: Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => {
    //         return {
    //             id: faker.string.uuid(),
    //             storeId: faker.string.uuid(),
    //             email: faker.internet.email(),
    //             name: faker.person.fullName(),
    //             status: faker.helpers.enumValue(MerchantStatus),
    //             createdAt: faker.date.recent().toISOString(),
    //         }
    //     })
    // }
}

export const addMerchant = async (body: AddMerchantBody): Promise<IResponse> => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "operating successfully",
    }
}

export const editMerchantAPI = async (body: EditMerchantBody): Promise<IResponse> => {
    const response = await putReq({
        path: "/account/merchant",
        data: body
    })
    return response.data;
}

export const reviewMerchantAPI = async (merchantId: string): Promise<IResponse> => {
    new Promise(resolve => (setTimeout(resolve, 1000)))
    const response = await putReq({
        path: "/account/merchant/review",
        params: {
            merchantId
        }
    })
    return response.data;
}

export const deleteMerchantAPI = async (merchantId: string): Promise<IResponse> => {
    const response = await deleteReq({
        path: "/account/merchant",
        params: {
            merchantId
        }
    })
    return response.data;
}