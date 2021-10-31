const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        users: async (parent, args, { user }) => {
            if (!user) throw new Error("unauthorized")
            return await models.User.findAll()
        },
        getUser: async (parent, args, { user }) => {
            if (!user) throw new Error("unauthorized")
            console.log(user.id)
            return await models.User.findByPk(user.id)
        },
        posts: async (parent, args) => {
            return await models.Post.findAll()
        },
        getPost: async (parent, { id }) => {
            return await models.Post.findByPk(id)
        }
    },
    Mutation: {
        register: async (parent, { name, email, password }) => {
            const checkUser = await models.User.findOne({ where: { email } })
            if (checkUser) throw new Error('User Already Exists');
            return await models.User.create({ name, email, password })
        },
        login: async (parent, { email, password }) => {
            //check if email exists in database
            const user = await models.User.findOne({ where: { email } });
            if (!user) throw new Error('User not registered')

            //check password validity
            if (password != user.password) throw new Error('Password is incorrect')

            //assign jwt token
            const token = jwt.sign({ id: user.id },  process.env.JWT_SECRET)
            return { token, user };
        },
        createPost: async (parent, { userId, name, description }) => {
            return await models.Post.create({ userId, name, description })
        }
    },
    User: {
        posts: async (user) => {
            return await user.getPosts()
        }
    },
    Post: {
        user: async (post) => {
            return await post.getUser()
        }
    }
}

module.exports = resolvers