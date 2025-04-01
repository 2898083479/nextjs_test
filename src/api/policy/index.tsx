import {
    IResponse,
    deleteReq,
    getReq,
    postReq,
    putReq
} from "../index";
import {
    PolicyResponse,
    createPolicyBody,
    policyBody,
    updatePolicyBody
} from "./types";

export const queryPolicyList = async (body?: policyBody): Promise<IResponse & { data: PolicyResponse[] }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "/policy/list",
        params: body,
        token: token || undefined
    })
    return response.data
}

export const queryPolicyInfo = async (id: string): Promise<IResponse & { data: PolicyResponse }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "/policy/one",
        params: {
            id
        },
        token: token || undefined
    })
    return response.data
}

export const updatePolicyInfo = async (policyId: string, body: updatePolicyBody): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: "/policy",
        params: {
            policyId
        },
        data: body,
        token: token || undefined
    })
    return response.data
}

export const createPolicyAPI = async (body: createPolicyBody): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await postReq({
        path: "/policy",
        data: body,
        token: token || undefined
    })
    return response.data
}

export const togglePolicyStatusAPI = async (policyId: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: "/policy/toggle",
        params: {
            policyId
        },
        token: token || undefined
    })
    return response.data
}

export const deletePolicyAPI = async (policyId: string): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await deleteReq({
        path: "/policy",
        params: { policyId },
        token: token || undefined
    })
    return response.data
}