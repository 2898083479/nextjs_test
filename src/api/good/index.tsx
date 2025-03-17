import { IResponse, getReq, putReq, deleteReq } from "../index";
import {
    searchBody,
    GoodResponse,
    buyBody,
    addGoodToShoppingCarBody,
    updateGoodBody
} from "./types";
import { ResponseStatusCode } from "../types";

export const queryGoodListAPI = async (body?: searchBody): Promise<IResponse & { data: GoodResponse[] }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: '/good/list',
        params: {
            ...body
        },
        token: token || undefined
    })
    return response.data
}

export const updateGoodAPI = async (body: updateGoodBody): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: '/good',
        data: body,
        token: token || undefined
    })
    return response.data
}

export const deleteGoodAPI = async (goodId: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await deleteReq({
        path: "/good",
        params: {
            goodId
        },
        token: token || undefined
    })
    return response.data
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

export const addGoodToShoppingCarAPI = async (body: addGoodToShoppingCarBody): Promise<IResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
    }
}