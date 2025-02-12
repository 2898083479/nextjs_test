import axios from 'axios';
import { ResponseStatusCode } from "./types";

export interface IRequest {
    path: string;
    params?: any;
    headers?: any;
    // token?: string;
}

export interface IResponse {
    category: string;
    code: ResponseStatusCode,
    message: string,
}

export interface IPostReqest extends IRequest {
    data?: any;
}

export const postReq = async ({ path, data = {}, params = {}, headers = {} }: IPostReqest) => {
    return await axios.post(path, data, {
        params,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

export const getReq = async ({ path, params = {}, headers = {} }: IRequest) => {
    return await axios.get(path, {
        params,
        headers: {
            ...headers
        }
    });
}

export const formPostReq = async ({ path, data, params, headers = {} }: IRequest & { data: FormData }) => {
    return await axios.post(path, data, {
        params,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

export const putReq = async ({ path, data = {}, params = {}, headers = {} }: IPostReqest) => {
    return await axios.put(path, data, {
        params,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

export const deleteReq = async ({ path, params = {}, headers = {} }: IRequest) => {
    return await axios.delete(path, {
        params,
        headers: {
            ...headers
        }
    });
}