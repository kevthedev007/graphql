const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')
const jwt = require('jsonwebtoken')
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        let user = null;

        if(req.headers.authorization) {
            const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            // console.log(payload)
            user = payload
        }
        return { user }
    }
});

server.applyMiddleware({ app });

app.listen(4000, () => {
    console.log('server started at port 4000')
})