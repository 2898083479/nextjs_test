import { IResponse, getReq, putReq, deleteReq, postReq } from "../index";
import {
    searchBody,
    GoodResponse,
    buyBody,
    addGoodToShoppingCarBody,
    updateGoodBody
} from "./types";

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

export const updateGoodAPI = async (goodId: string, body: updateGoodBody): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: '/good',
        params: {
            goodId
        },
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
    const token = localStorage.getItem("accessToken");
    const response = await postReq({
        path: "/order",
        data: body,
        token: token || undefined
    })
    return response.data
}

export const addGoodToShoppingCarAPI = async (body: addGoodToShoppingCarBody): Promise<IResponse> => {
    const token = localStorage.getItem("accessToken");
    const response = await postReq({
        path: "/shoppingCar",
        data: body,
        token: token || undefined
    })
    return response.data
}