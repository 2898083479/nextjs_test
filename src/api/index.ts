import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResponseStatusCode } from "./types";
import { refreshToken } from "./auth/refreshToken";
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

axios.defaults.baseURL = 'http://localhost:8080'; // java
// axios.defaults.baseURL = 'http://localhost:8000'; // python

interface QueueTask {
    config: AxiosRequestConfig;
    resolve: (value: AxiosResponse<any, any>) => void;
}

let isRefreshing = false;
let queue: QueueTask[] = [];

export const setupAxiosInterceptors = (router: AppRouterInstance) => {
    axios.interceptors.response.use(
        async (response) => {
            if (response.data.code === ResponseStatusCode.unauthorized) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    const { code, data } = await refreshToken();
                    /**
                     * 獲取最新的access token
                     * 判斷響應結果是否正確：
                     * 1、不正確：返回登錄界面
                     * 2、正確：將最新的access token存儲到localStorage中, 並將queue中的任務取出繼續執行
                     */
                    if (code !== ResponseStatusCode.success) {
                        router.push('/admin/signin')
                        return response;
                    }
                    queue.forEach((task) => {
                        const config = task.config;
                        config.headers!.Authorization = `Bearer ${data.accessToken}`;
                        axios(config);
                    })
                    queue = []
                    console.log('data', data)
                    isRefreshing = false;
                    // 將最新的access token放到Authorization中
                    localStorage.setItem('accessToken', data.accessToken);
                    response.config.headers.Authorization = `Bearer ${data.accessToken}`;
                    // 再次發送請求
                    return axios(response.config);
                }
                // 將任務添加到queue中
                return new Promise((resolve) => {
                    queue.push({
                        config: response.config,
                        resolve: resolve
                    })
                })
            }
            return response;
        }, (error) => {
            if (typeof window !== "undefined") {
                const router = require('next/router').default
                if (error.response?.status === ResponseStatusCode.unauthorized) {
                    localStorage.removeItem('accessToken')
                    router.push('/admin/signin')
                }
            }
            return Promise.reject(error)
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
                'Authorization': `Bearer ${token}`
            },
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