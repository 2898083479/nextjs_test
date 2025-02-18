import axios from 'axios';
import { ResponseStatusCode } from "./types";

export interface IRequest {
    path: string;
    params?: any;
    headers?: any;
    token?: string;
}

export interface IResponse {
    category: string;
    code: ResponseStatusCode,
    message: string,
}

export interface IPostReqest extends IRequest {
    data?: any;
}

axios.defaults.baseURL = 'http://localhost:8080';

export const postReq = async ({ path, data = {}, params = {}, headers = {}, token }: IPostReqest) => {
    return await axios.post(path, data, {
        params,
        headers: {
            ...token && {
                Authorization: `Bearer ${token}`
            },
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

export const getReq = async ({ path, params = {}, headers = {}, token }: IRequest) => {
    return await axios.get(path, {
        params,
        headers: {
            ...token && {
                Authorization: `Bearer ${token}`
            },
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

export const formPostReq = async ({ path, data, params, headers = {}, token }: IRequest & { data: FormData }) => {
    return await axios.post(path, data, {
        params,
        headers: {
            ...token && {
                Authorization: `Bearer ${token}`
            },
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

export const putReq = async ({ path, data = {}, params = {}, headers = {}, token }: IPostReqest) => {
    return await axios.put(path, data, {
        params,
        headers: {
            ...token && {
                Authorization: `Bearer ${token}`
            },
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

export const deleteReq = async ({ path, params = {}, headers = {}, token }: IRequest) => {
    return await axios.delete(path, {
        params,
        headers: {
            ...token && {
                Authorization: `Bearer ${token}`
            },
            ...headers
        }
    });
}