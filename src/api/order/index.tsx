import { getReq, IResponse, postReq, deleteReq } from "../index";
import { OrderResponse, OrderBody } from "./types";

export const getOrderList = async (merchantId?: string): Promise<IResponse & { data: OrderResponse[] }> => {
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

export const feedbackOrderAPI = async (orderId: string, reason: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken') || "";
    const response = await postReq({
        path: "/order/feedback",
        params: {
            orderId,
            reason
        },
        token
    })
    return response.data;
}

export const deleteOrderAPI = async (orderId: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken') || "";
    const response = await deleteReq({
        path: "/order",
        params: { orderId },
        token
    })
    return response.data;
}