const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        id:ID!
        name: String
        email: String
        posts: [Post!]!
    }

    type Post {
        id: ID
        name: String
        description: String
        user: User!
    }

    type AuthPayload {
        token: String!,
        user: User!
    }

    type Query {
        users: [User!]!
        getUser: User
        posts: [Post!]!
        getPost(id: ID!): Post!
    }

    type Mutation {
        register(name: String, email: String, password: String): User
        login(email: String, password: String): AuthPayload!
        createPost(userId: String, name:String, description: String): Post
    }
`


module.exports = typeDefs