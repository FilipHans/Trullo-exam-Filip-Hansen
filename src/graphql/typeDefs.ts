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
    id: ID!,
    name: String,
    email: String,
    password: String,
}

input UpdateTaskInput {
    id: ID!,
    status: Status,
    title: String,
    description: String,
}


type Query {
    # Get all users
    Users(input: Int) : [User!]

    # Get one user by email
    User(email: String) : User!

    # List all task related to user 
    Task(_id: ID) : [Task!]
}

type Mutation {
    UpdateUser(input: UpdateUserInput) : User,
    CreateUser(input: UserInput!) : User!,
    DeleteUser(input: ID!) : ID!

    CreateTask(input: TaskInput!) : Task!,
    UpdateTask(input: UpdateTaskInput): Task!,
}



`;

export default typeDefs