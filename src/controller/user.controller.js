const jwt = require('jsonwebtoken')

const userService = require('../service/user.service')
const { PRIVATE_KEY } = require('../app/config')
const { SuccessModel, ErrorModel } = require('../model/res.model')

class UserController {
  async login(ctx, next) {
    const { id, username } = ctx.user
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 12 * 60 * 60,
    })
    const res = {
      id,
      username,
      token,
    }
    ctx.body = new SuccessModel(res, '登录成功')
  }

  async logout(ctx, next) {}

  async register(ctx, next) {
    const { username, password } = ctx.request.body
    try {
      const result = await userService.register(username, password)
      ctx.body = new SuccessModel(null, '注册成功')
    } catch (error) {
      ctx.body = new ErrorModel(null, error.message)
    }
  }
}

module.exports = new UserController()
