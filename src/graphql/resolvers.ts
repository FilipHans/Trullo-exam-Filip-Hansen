import mongoose from "mongoose";
import User from "../models/User";
import Task from "../models/Task";
import * as z from 'zod';
import { GraphQLError } from "graphql";


const SafeUserSchema = z.object(
    {
        name: z.string(),
        email: z.email('Must be a valid email pattern'),
        password: z.coerce
        .string()
        .min(8, 'Must contain atleast 8 characters')
    })

const SafeTaskSchema = z.object(
    {
        title: z.string(),
        description: z.string(),
    }
)

enum Status {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    BLOCKED = "BLOCKED",
    DONE = "DONE",
}

const resolvers = {

    Query : {

        User: async (_p: any, {email} : {email : String}) => {
            return User.findOne({email: email})
        },
        Users: async (_p: any, _input: any) => {

            return User.find();
        },
        Task: async (_p: any, { _id }:{_id:  mongoose.Schema.Types.ObjectId}) => {

            if (!mongoose.isValidObjectId(_id)) {
                throw new GraphQLError("ID is not valid", {
                    extensions: {code: "STATUS_CODE_400", taskId: _id}
                })
            }
            return Task.findById(_id);
        }
    },

    Mutation : {
        // User Mutations
        CreateUser : async (_p: any, { input } : any) => {


            const {email, password, name} : {email: String, password: String, name: String} = input

            const result = SafeUserSchema.safeParse(input);

            if (!result.success) {
                throw new GraphQLError("Invalid input", {
                    extensions: {code: "STATUS_CODE_400", issues: result.error.issues}
                })
            }
            return User.create({email, password, name});
        
        },
        UpdateUser : async (_p: any, {input} : any) => {
            const {_id, name, email, password} : {_id: mongoose.Schema.Types.ObjectId ,name: String, email: String, password: String} = input;

            if (!mongoose.isValidObjectId(_id)) {
                throw new GraphQLError("ID is not valid", {
                    extensions: {code: "STATUS_CODE_400", UserId: _id}
                })
            }
            
            const result = SafeUserSchema.safeParse({name, email, password});

            if (!result.success) {
                throw new GraphQLError("Invalid input", {
                    extensions: {code: "STATUS_CODE_400", issues: result.error.issues}
                })
            }


            return User.findByIdAndUpdate(_id, {email, password, name});
        },
        DeleteUser : async (_p: any, {input} : any) => {
            const { _id } : {_id: mongoose.Schema.Types.ObjectId} = input;

            if (!mongoose.isValidObjectId(_id)) {
                throw new GraphQLError("ID is not valid", {
                    extensions: {code: "STATUS_CODE_400", userId: _id}
                })
            }
            return User.findByIdAndDelete(_id);
        },

        // Task Mutations
        CreateTask : async (_p: any, {input} : any ) => {
            const { title, description, assignedTo} : {title: String, description: String, assignedTo: mongoose.Schema.Types.ObjectId} = input;
            
            if (!mongoose.isValidObjectId(assignedTo)) {
                throw new GraphQLError("ID is not valid", {
                    extensions: {code: "STATUS_CODE_400", assignedTo: assignedTo}
                })
            }

            const result = SafeTaskSchema.safeParse({title, description});

            if (!result.success) {
                throw new GraphQLError("Invalid input", {
                    extensions: {code: "STATUS_CODE_400"}
                })
            }

            return Task.create({title, description, assignedTo});
        },
        UpdateTask : async (_p: any, {input} : any ) => {
            const {_id, title, description, status } : {_id: mongoose.Schema.Types.ObjectId, title: String, description: String, status: Status} = input;
            
            if (!mongoose.isValidObjectId(_id)) {
                throw new GraphQLError("ID is not valid", {
                    extensions: {code: "STATUS_CODE_400", taskId: _id}
                })
            }
            if (status == Status.DONE ) {
                const finishedAt = new Date();
                return Task.findByIdAndUpdate(_id, {status, title, description, finishedAt})
            }
            return  Task.findByIdAndUpdate(_id, {status, title, description});
        },
    },

    Task : {
        createdAt: (doc: mongoose.DocumentSetOptions) => doc.createdAt.toISOString(),
		finishedAt: (doc: mongoose.DocumentSetOptions) => doc.updatedAt.toISOString(),
    }
}






export default resolvers;