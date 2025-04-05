import { ShoppingCarResponse } from "./types";
import { faker } from "@faker-js/faker";
import { ResponseStatusCode } from "../types";
import { deleteReq, getReq, IResponse } from "../index";

export const getShoppingCarList = async (merchantId: string): Promise<IResponse & { data: ShoppingCarResponse[] }> => {

    const token = localStorage.getItem("accessToken");
    const response = await getReq({
        path: "/shoppingCar/list",
        params: {
            merchantId
        },
        token: token || undefined
    });
    return response.data;
}

export const clearShoppingCarAPI = async (id: string): Promise<IResponse> => {
    const token = localStorage.getItem("accessToken");
    const response = await deleteReq({
        path: "/shoppingCar/clear",
        params: {
            id
        },
        token: token || undefined
    })
    return response.data;
}

export const deleteShoppingCarAPI = async (id: string): Promise<IResponse> => {
    const token = localStorage.getItem("accessToken");
    const response = await deleteReq({
        path: "/shoppingCar",
        params: {
            id
        },
        token: token || undefined
    })
    return response.data;
}