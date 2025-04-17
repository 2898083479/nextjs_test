import { ISignUpBody } from "@/api/auth/siginup"
import { formPostReq, IResponse } from "@/api/index"

export const userSignUpAPI = async (body: ISignUpBody): Promise<IResponse> => {
    const formData = new FormData();
    formData.append('email', body.email);
    formData.append('password', body.password);
    formData.append('avatar', body.avatar || "");
    const response = await formPostReq({
        path: '/account/merchant/register',
        data: formData,
    })
    return response.data;
}