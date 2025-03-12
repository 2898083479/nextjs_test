import { 
    IResponse, 
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
import { ResponseStatusCode } from "../types";

export const queryPolicyList = async (body?: policyBody): Promise<IResponse & { data: PolicyResponse[] }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "policy/list",
        params: body,
        token: token || undefined
    })
    return response.data
}

export const updateStatusAPI = async (): Promise<IResponse> => {
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
    }
}

export const queryPolicyInfo = async (id: string): Promise<IResponse & { data: PolicyResponse }> => {
    const token = localStorage.getItem('accessToken')
    const response = await getReq({
        path: "policy/one",
        params: {
            id
        },
        token: token || undefined
    })
    return response.data
}

export const updatePolicyInfo = async (body: updatePolicyBody): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await putReq({
        path: "policy",
        data: body,
        token: token || undefined
    })
    return response.data
}

export const createPolicyAPI = async (body: createPolicyBody): Promise<IResponse> => {
    const token = localStorage.getItem('accessToken')
    const response = await postReq({
        path: "policy",
        data: body,
        token: token || undefined
    })
    return response.data
}