const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  const result = await userService.isExist(username)
  if (!result) {
    ctx.body = {
      message: '该用户未注册',
      code: 1000,
      data: null,
    }
  } else {
    if (md5password(password) !== result.password) {
      ctx.body = {
        message: '密码错误',
        code: 1000,
        data: null,
      }
    } else {
      ctx.user = { id: result.id, username }
      await next()
    }
  }
}

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.body = {
      message: '用户名或密码不能为空',
      code: 1000,
      data: null,
    }
  } else if (username.length < 6 || password.length < 6) {
    ctx.body = {
      message: '用户名或密码不能少于6位',
      code: 1000,
      data: null,
    }
  } else {
    await next()
  }
}

const verifyExists = async (ctx, next) => {
  const { username } = ctx.request.body
  try {
    const result = await userService.isExist(username)
    console.log(result)
    if (result) {
      ctx.body = {
        message: '该用户已经注册',
        code: 1000,
        data: null,
      }
    } else {
      await next()
    }
  } catch (error) {
    ctx.body = {
      message: error.message,
      code: 1000,
      data: null,
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
}
