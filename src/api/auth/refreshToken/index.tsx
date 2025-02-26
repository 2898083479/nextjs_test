import { IResponse } from "../../index"
import { ResponseStatusCode } from "../../types"
import { faker } from "@faker-js/faker"

interface IRefreshTokenResponse extends IResponse {
    data: {
        accessToken: string;
    }
}

export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
        data: {
            accessToken: faker.string.uuid()
        }
    }
}
