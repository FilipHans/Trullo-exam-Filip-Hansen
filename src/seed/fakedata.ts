import { faker } from '@faker-js/faker';
import { array, keyof } from 'zod';

enum Status {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    BLOCKED = "BLOCKED",
    DONE = "DONE",
    
}

function getRandomEnumValue<T extends { [key: string]: string | number }>(enumObj: T): T[keyof T] {
    const enumValues = Object.values(enumObj) as Array<keyof T>;
    const randomIndex = Math.floor(Math.random() * 3);
    return enumValues[randomIndex] as T[keyof T];
}

export function createRandomUser() {
    return {
        name: faker.internet.username() ,
        email: faker.internet.email() ,
        password: faker.internet.password(),
    }
}

export function createRandomTask() {
    return {
        title: faker.word.noun(),
        description: faker.word.words(),
        status: getRandomEnumValue(Status)
    }
}


