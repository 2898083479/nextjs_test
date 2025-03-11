import { IResponse, deleteReq, getReq, putReq } from "../index"
import { ResponseStatusCode } from "../types"
import { MerchantResponse, SearchBody, AddMerchantBody, EditMerchantBody } from "./types";

export const getMerchantInfo = async (body?: SearchBody): Promise<IResponse & { data: MerchantResponse[] }> => {
    const token = localStorage.getItem('accessToken')
    console.log('token', token)
    const response = await getReq({
        path: "/account/merchant/list",
        params: body,
        token: token || undefined
    })
    return response.data;
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