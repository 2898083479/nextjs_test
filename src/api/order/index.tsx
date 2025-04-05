import { getReq, IResponse, postReq } from "../index";
import { OrderResponse, OrderBody } from "./types";

export const getOrderList = async (merchantId: string): Promise<IResponse & { data: OrderResponse[] }> => {
    const token = localStorage.getItem('accessToken') || "";
    const response = await getReq({
        path: "/order/list",
        params: {
            merchantId
        },
        token,
    })
    return response.data;
}

export const createOrder = async (body: OrderBody): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken') || "";
    const response = await postReq({
        path: "/order",
        data: body,
        token
    })
    return response.data;
}