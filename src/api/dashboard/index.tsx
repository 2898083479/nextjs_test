import { IResponse, getReq } from "../index";
import { Overview } from "./types";
import { ResponseStatusCode } from "../types";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
export const getBarginOverview = async (): Promise<IResponse & {data: Overview[]}> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
        category: "00",
        code: ResponseStatusCode.success,
        message: "success",
        data: Array.from({ length: 8 }).map((_, index) => ({
            month: dayjs().subtract(index, "month").format("YYYY-MM"),
            merchant: faker.number.int({ min: 100, max: 300 }),
            store: faker.number.int({ min: 100, max: 300 }),
            good: faker.number.int({ min: 100, max: 300 }),
        }))
    }
}