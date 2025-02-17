import { IResponse, formPostReq } from "../../index";

export interface ISignUpBody {
    email: string;
    password: string;
}

export const signUpAPI = async (body: ISignUpBody): Promise<IResponse> => {
    const formData = new FormData();
    formData.append('email', body.email);
    formData.append('password', body.password);

    const response = await formPostReq({
        path: '/admins/register',
        data: formData,
    })

    return response.data;

}