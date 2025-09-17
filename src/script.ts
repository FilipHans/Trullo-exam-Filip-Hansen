import mongoose from "mongoose";
import  express  from "express";
import dotenv from 'dotenv';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import connectDB from "./db";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import  jwt  from "jsonwebtoken";

dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET || 'no secret found';

const getUser = (authHeader: string | undefined) => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) return;

    const token = authHeader.split(' ')[1];

    const decodedUser = jwt.verify(token, JWT_SECRET)
    return decodedUser;
}

// Start and connect Apollo server
const server = new ApolloServer({typeDefs, resolvers})
server.start().then(e => {
    app.use("/graphql", expressMiddleware(server, {
    context: async ({req}) => {
        const authHeader = req.headers.authorization;
        const user = getUser(authHeader);
        return { user };
    },
}))
})

// Connect to MongdoDB
connectDB()
.then(e => console.log('connected to mongoDB'))
.catch(error => {
    console.error('Issue running server', error)
})

// Start server
app.listen(port, () => {
    console.log(`running on`, port)
})

