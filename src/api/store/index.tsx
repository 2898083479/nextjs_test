import { deleteReq, getReq, IResponse, putReq, postReq } from "../index";
import { StoreResponseInfo, AddMerchantToStoreBody } from "./types";
import { EditStoreBody } from "./types";
interface Body {
    filter?: {
        search?: string; // search keyword
        merchantCount?: number; // merchant count
        goodCount?: number; // good count
    }
}

export const getStoreInfoList = async (body?: Body): Promise<IResponse & { data: StoreResponseInfo[] }> => {
    const response = await getReq({
        path: "/store/list",
        params: body
    })
    return response.data;
}

export const ReviewStoreAPI = async (storeId: string): Promise<IResponse> => {
    const response = await putReq({
        path: "/store/review",
        params: {
            storeId
        }
    })
    return response.data;
}

export const EditStoreAPI = async (body: EditStoreBody): Promise<IResponse> => {
    const response = await putReq({
        path: "/store",
        data: body
    })
    return response.data;
}

export const DeleteStoreAPI = async (storeId: string): Promise<IResponse> => {
    const response = await deleteReq({
        path: "/store",
        params: {
            storeId
        }
    })
    return response.data;
}

export const AddMerchantToStoreAPI = async (body: AddMerchantToStoreBody): Promise<IResponse> => {
    const response = await postReq({
        path: "/store/add/merchant",
        data: body
    })
    return response.data;
}