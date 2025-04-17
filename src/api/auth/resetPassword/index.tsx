import { IResponse, putReq } from "../../index";

export interface IResetPasswordBody {
    email: string;
    password: string;
}

export const resetPasswordAPI = async (body: IResetPasswordBody): Promise<IResponse> => {
    const formData = new FormData();
    formData.append('email', body.email);
    formData.append('password', body.password);

    const response = await putReq({
        path: '/account/admins/reset',
        data: formData,
    })

    return response.data;
}