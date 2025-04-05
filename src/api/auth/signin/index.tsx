import { IResponse, formPostReq } from "../../index";

export interface ISignInBody {
    email: string;
    password: string;
}

export interface ISignInResponse extends IResponse {
    data: {
        accessToken: string;
        refreshToken: string;
    }
}

export const signInAPI = async (body: ISignInBody): Promise<ISignInResponse> => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const formData = new FormData();
    formData.append('email', body.email);
    formData.append('password', body.password);

    const response = await formPostReq({
        path: '/account/admins/login',
        data: formData,
    })

    return response.data;
}
1
