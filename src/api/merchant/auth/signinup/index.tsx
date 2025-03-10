import { ISignUpBody } from "@/api/auth/siginup"
import { IResponse } from "@/api/index"

export const userSignUpAPI = async (body: ISignUpBody): Promise<IResponse> => {
    return await new Promise((resolve) => setTimeout(resolve, 3000))
}