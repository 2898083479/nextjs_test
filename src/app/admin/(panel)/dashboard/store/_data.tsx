import { faker } from "@faker-js/faker";
import { Store, StoreStatus } from "./types";

const newData = (): Store => {
    return {
        name: faker.company.name(),
        email: faker.internet.email(),
        merchantCount: faker.number.int({ min: 1, max: 10 }),
        goodCount: faker.number.int({ min: 100, max: 1000 }),
        status: faker.helpers.enumValue(StoreStatus),
        createdAt: faker.date.past().toISOString(),
        id: faker.string.uuid(),
    }
}

const makeData = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
        return {
            ...newData(),
        }
    });
}

export const getFakeData = async () => {
    await new Promise(r => setTimeout(r, 200));

    return makeData(faker.number.int({ min: 20, max: 100 }));
}