import { deleteReq, getReq, IResponse, putReq, postReq } from "../index";
import { StoreResponseInfo, AddMerchantToStoreBody, GoodListofStore } from "./types";
import { EditStoreBody } from "./types";
import { MerchantResponse } from "../merchant/types";

interface Body {
    search?: string | ''; // search keyword
    merchantCount?: number | ''; // merchant count
    goodCount?: number | ''; // good count
}

export const getStoreInfoList = async (body?: Body): Promise<IResponse & { data: StoreResponseInfo[] }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "/store/list",
        params: body,
        token: token || undefined
    })
    return response.data;
}

export const ReviewStoreAPI = async (storeId: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: "/store/review",
        params: {
            storeId
        },
        token: token || undefined
    })
    return response.data;
}

export const EditStoreAPI = async (storeId: string, body: EditStoreBody): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: "/store",
        params: {
            storeId
        },
        data: body,
        token: token || undefined
    })
    return response.data;
}

export const DeleteStoreAPI = async (storeId: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await deleteReq({
        path: "/store",
        params: {
            storeId
        },
        token: token || undefined
    })
    return response.data;
}

export const AddMerchantToStoreAPI = async (storeId: string, merchantIds: string[]): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: "/store/add/merchant",
        params: {
            storeId
        },
        data: {
            merchantIds
        },
        token: token || undefined
    })
    return response.data;
}

export const QueryMerchantByStoreAPI = async (storeId: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "/store/merchant/list",
        params: { storeId },
        token: token || undefined
    })
    return response.data;
}

export const queryMerchantListByStoreAPI = async (storeId: string): Promise<IResponse & { data: MerchantResponse[] }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "/store/merchant/list",
        params: {
            storeId
        },
        token: token || undefined
    })
    return response.data;
}

export const QueryGoodListofStoreAPI = async (storeId: string): Promise<IResponse & { data: GoodListofStore[] }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "/store/good/list",
        params: { storeId },
        token: token || undefined
    })
    return response.data;
}