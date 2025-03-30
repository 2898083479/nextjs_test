import { deleteReq, getReq, IResponse, putReq, postReq } from "../index";
import { StoreResponseInfo, AddMerchantToStoreBody } from "./types";
import { EditStoreBody } from "./types";
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

export const AddMerchantToStoreAPI = async (body: AddMerchantToStoreBody): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await postReq({
        path: "/store/add/merchant",
        data: body,
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