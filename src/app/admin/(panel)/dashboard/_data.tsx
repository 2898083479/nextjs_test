import { faker } from "@faker-js/faker";
import { Admin, AdminStatus } from "./types";

const newData = (): Admin => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        status: faker.helpers.enumValue(AdminStatus),
        createdAt: faker.date.past().toISOString(),
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