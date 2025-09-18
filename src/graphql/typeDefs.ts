const typeDefs = /* GraphQL */ `

enum Status {
    TO_DO
    IN_PROGRESS
    BLOCKED
    DONE
}

type User {
    name: String!,
    email: String!,
    password: String!,
}

type Task {
    id: ID!,
    title: String!,
    description: String!,
    status: Status,
    createdAt: String!
	finishedAt: String!
}
input IDInput {
    _id: ID,
}

input UserInput {
    name: String!,
    email: String!,
    password: String!,
}

input TaskInput {
    title: String!,
    description: String,
    assignedTo: ID!,
}

input UpdateUserInput {
    name: String,
    email: String,
    password: String,
}

input adminUpdate {
    name: String,
    email: String,
    password: String,
    id: ID!,
}

input UpdateTaskInput {
    id: ID!,
    status: Status,
    title: String,
    description: String,
}

input LoginInput {
    email: String!,
    password: String!,
}

input changePassword {
    oldPassword: String!,
    newPassword: String!,
}

type AuthPayload {
    user: String!,
    token: String!,
}

type Query {
    # Get all users
    Users : [User]!

    # Get one user by email
    User(email: String) : User!

    # List all task related to user 
    Task(_id: ID) : [Task]!
}

type Mutation {

    UpdateUser(input: UpdateUserInput) : User,
    CreateUser(input: UserInput!) : User!,
    DeleteUser : ID!,

    adminDeleteUser(_id: ID) : ID!,
    adminUpdateUser(input: adminUpdate) : User!,

    updatePassword(input: changePassword!) : User!,
    
    CreateTask(input: TaskInput!) : Task!,
    UpdateTask(input: UpdateTaskInput): Task!,
    login(input: LoginInput): AuthPayload!,
}

`;

export default typeDefs