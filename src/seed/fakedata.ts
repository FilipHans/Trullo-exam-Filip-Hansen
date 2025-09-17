import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

async function genPassword () {
   const password = await bcrypt.hash(faker.internet.password.toString(), 10)
   return password;
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
        

    }
}

// const users = faker.helpers.multiple(createRandomUser, { 
//     count: 5,
// })

