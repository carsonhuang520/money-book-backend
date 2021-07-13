const { ErrorModel, SuccessModel } = require('../model/res.model')
const iconService = require('../service/icon.service')

class IconController {
  async getIcons(ctx, next) {
    try {
      const result = await iconService.getIcons()
      ctx.body = new SuccessModel(result, '获取成功')
    } catch (error) {
      ctx.body = new ErrorModel(null, error.message)
    }
  }
}

module.exports = new IconController()
