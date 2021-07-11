const jwt = require('jsonwebtoken')

const userService = require('../service/user.service')
const { PRIVATE_KEY } = require('../app/config')

class UserController {
  async login(ctx, next) {
    const { id, username } = ctx.user
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 12 * 60 * 60,
    })
    ctx.body = {
      message: '登录成功',
      code: 0,
      data: {
        id,
        username,
        token,
      },
    }
  }

  async logout(ctx, next) {}

  async register(ctx, next) {
    const { username, password } = ctx.request.body
    try {
      const result = await userService.register(username, password)
      ctx.body = {
        message: '注册成功',
        code: 0,
        data: null,
      }
    } catch (error) {
      ctx.body = {
        message: error.message,
        code: 1000,
        data: null,
      }
    }
  }
}

module.exports = new UserController()
