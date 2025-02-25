import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResponseStatusCode } from "./types";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
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

interface QueueTask {
    config: AxiosRequestConfig;
    resolve: (value: AxiosResponse<any, any>) => void;
}

let isRefreshing = false;
let queue: QueueTask[] = [];

export const setupAxiosInterceptors = (router: AppRouterInstance) => {
    axios.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }
    )

    axios.interceptors.response.use(
        async (response) => {
            if (response.data.code === ResponseStatusCode.unauthorized) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    /**
                     * 獲取最新的access token
                     * 判斷響應結果是否正確：
                     * 1、不正確：返回登錄界面
                     * 2、正確：將最新的access token存儲到localStorage中, 並將queue中的任務取出繼續執行
                     */
                    // 將最新的access token放到Authorization中
                    // 再次發送請求
                }
                // 將任務添加到queue中
            }
            return response;
        }, (error) => {
            router.push('/admin/signin')
        }
    )
}

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