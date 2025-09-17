import mongoose from 'mongoose';
import connectDB from '../db';
import User from '../models/User';
import Task from '../models/Task';
import { createRandomTask, createRandomUser } from './fakedata';
import bcrypt from 'bcrypt';

connectDB()
.then(e => console.log('connected to mongoDB'))
.catch(error => {
    console.error('Issue running server', error)
})

enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

interface User {
    name: string,
    email: string,
    password: string,
    role?: Role,
}

interface Task {
    assignedTo?: string,
    title: string,
    description: string,
}

const seedDB = async () => {
    try {
        await User.deleteMany();
        await Task.deleteMany();
        const fakeUserData: User[] = Array.from({length: 3}, createRandomUser);
        const fakeTaskData: Task[] = Array.from({length: 3}, createRandomTask);
        await User.insertMany(fakeUserData);
        
        const users = await User.find();
        console.log(fakeUserData);

        await Promise.all(
            fakeUserData.map(async (e) => {
                e.password = await bcrypt.hash(e.password, 10);
            })
        )
        fakeTaskData.map((e, index) => {
            e.assignedTo = (users[index]._id).toString();
        })
        await User.deleteMany();
        await User.insertMany(fakeUserData);
        await Task.insertMany(fakeTaskData);
        const hashedPassword = await bcrypt.hash('admin1234', 10);
        await User.create({name: 'admin', email: 'admin@example.com', password: hashedPassword, role: Role.ADMIN})

        console.log('seeding complete');
    } catch (error) {
        console.error('seeding error', error)
    } finally {
        mongoose.connection.close();
    }
}

seedDB();