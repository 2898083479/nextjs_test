import { formPostReq, IResponse } from "@/api/index"


export interface ISignInBody {
    email: string;
    password: string;
    avatar?: string;
}

export interface ISignInResponse extends IResponse {
    data: {
        merchantId: string;
        merchantName: string;
        merchantEmail: string;
        accessToken: string;
    }
}

export const userSignInAPI = async (body: ISignInBody): Promise<ISignInResponse> => {
    const formData = new FormData();
    formData.append('email', body.email);
    formData.append('password', body.password);
    formData.append('avatar', body.avatar || "");
    const response = await formPostReq({
        path: "/account/merchant/login",
        data: formData
    })
    return response.data;
}