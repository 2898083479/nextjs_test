import { IResponse } from "@/api/index"
import { ResponseStatusCode } from "@/api/types";
import { faker } from "@faker-js/faker";


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

export const userSignInAPI = async (body: ISignInBody): Promise<ISignInResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return {
        category: '00',
        code: ResponseStatusCode.success,
        message: 'success',
        data: {
            accessToken: faker.string.uuid(),
            refreshToken: faker.string.uuid(),
        }
    }
}