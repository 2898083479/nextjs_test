import { IResponse, deleteReq, getReq, putReq } from "../index"
import { StoreResponseInfo } from "../store/types";
import { ResponseStatusCode } from "../types"
import { MerchantResponse, AddMerchantBody, EditMerchantBody } from "./types";

export const getMerchantInfo = async (search?: string): Promise<IResponse & { data: MerchantResponse[] }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "/account/merchant/list",
        params: {
            search,
        },
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
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: "/account/merchant",
        data: body,
        token: token || undefined
    })
    return response.data;
}

export const reviewMerchantAPI = async (merchantId: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: "/account/merchant/review",
        params: {
            merchantId
        },
        token: token || undefined
    })
    return response.data;
}

export const deleteMerchantAPI = async (merchantId: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await deleteReq({
        path: "/account/merchant",
        params: {
            merchantId
        },
        token: token || undefined
    })
    return response.data;
}

export const getStoreListOfMerchant = async (merchantId: string): Promise<IResponse & { data: StoreResponseInfo[] }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "/account/merchant/store/list",
        params: { merchantId },
        token: token || undefined
    })
    return response.data;
}