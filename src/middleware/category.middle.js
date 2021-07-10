const categoryService = require('../service/category.service')

const verifyExists = async (ctx, next) => {
  const { type, name } = ctx.request.body
  try {
    const isExist = await categoryService.isExistCategory(name, type)
    if (isExist) {
      ctx.body = {
        message: '该类别已经存在！！！',
        code: 0,
      }
    } else {
      await next()
    }
  } catch (error) {
    ctx.body = {
      message: '错误！！！',
      code: 1000,
    }
  }
}

module.exports = {
  verifyExists,
}
