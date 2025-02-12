import { IResponse, postReq } from "../../index";

export interface IResetPasswordBody {
    email: string;
    password: string;
}

export const resetPasswordAPI = async (body: IResetPasswordBody): Promise<IResponse> => {
    const formData = new FormData();
    formData.append('email', body.email);
    formData.append('password', body.password);

    const response = await postReq({
        path: 'http://localhost:8080/admins/reset-password',
        data: formData,
    })

    return response.data;
}