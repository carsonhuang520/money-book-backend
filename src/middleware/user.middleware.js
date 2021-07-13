const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')
const { ErrorModel } = require('../model/res.model')

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  const result = await userService.isExist(username)
  if (!result) {
    ctx.body = new ErrorModel(null, '该用户未注册')
  } else {
    if (md5password(password) !== result.password) {
      ctx.body = new ErrorModel(null, '密码错误')
    } else {
      ctx.user = { id: result.id, username }
      await next()
    }
  }
}

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.body = new ErrorModel(null, '用户名或密码不能为空')
  } else if (username.length < 6 || password.length < 6) {
    ctx.body = new ErrorModel(null, '用户名或密码不能少于6位')
  } else {
    await next()
  }
}

const verifyExists = async (ctx, next) => {
  const { username } = ctx.request.body
  try {
    const result = await userService.isExist(username)
    if (result) {
      ctx.body = new ErrorModel(null, '该用户已注册')
    } else {
      await next()
    }
  } catch (error) {
    ctx.body = new ErrorModel(null, error.message)
  }
}

const verifyAuth = async (ctx, next) => {
  const token = ctx.headers.token
  if (!token) {
    ctx.body = new ErrorModel(null, '未授权')
  } else {
    try {
      const result = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ['RS256'],
      })
      ctx.user = result
      await next()
    } catch (err) {
      ctx.body = new ErrorModel(null, '授权失效')
    }
  }
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  verifyExists,
  handlePassword,
  verifyLogin,
  verifyAuth,
}
