const Router = require('koa-router')

const { login, register, logout } = require('../controller/user.controller')
const {
  verifyLogin,
  verifyUser,
  verifyExists,
  handlePassword,
} = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', verifyUser, verifyLogin, login)
userRouter.post('/register', verifyUser, verifyExists, handlePassword, register)
userRouter.post('/logout', logout)

module.exports = userRouter
