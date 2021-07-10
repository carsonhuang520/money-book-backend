const iconService = require('../service/icon.service')

class IconController {
  async getIcons(ctx, next) {
    try {
      const result = await iconService.getIcons()
      ctx.body = {
        message: 'success',
        code: 0,
        data: result,
      }
    } catch (error) {
      ctx.body = {
        message: error.message,
        code: 1000,
      }
    }
  }
}

module.exports = new IconController()
