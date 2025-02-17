import { IResponse, formPostReq } from "../../index";

export interface ISignInBody {
    email: string;
    password: string;
}

export const signInAPI = async (body: ISignInBody): Promise<IResponse> => {
    const formData = new FormData();
    formData.append('email', body.email);
    formData.append('password', body.password);

    const response = await formPostReq({
        path: '/admins/login',
        data: formData,
    })

    return response.data;
}