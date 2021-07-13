const { ErrorModel, SuccessModel } = require('../model/res.model')
const accountService = require('../service/account.service')
const categoryService = require('../service/category.service')

const verifyExists = async (ctx, next) => {
  const { type, name } = ctx.request.body
  try {
    const isExist = await categoryService.isExistCategory(name, type)
    if (isExist) {
      ctx.body = new ErrorModel(null, '该类别已存在')
    } else {
      await next()
    }
  } catch (error) {
    ctx.body = new ErrorModel(null, error.message)
  }
}

const getAccountsByCategotyId = async (ctx, next) => {
  const { id } = ctx.params
  try {
    const result = await categoryService.getAccountsByCategoryId(id)
    ctx.accounts = result
    await next()
  } catch (err) {
    ctx.body = new ErrorModel(null, err.message)
  }
}

const changeAccountsCategory = async (ctx, next) => {
  const { type } = ctx.query
  try {
    const other = await categoryService.getOtherCategory('其他', type)
    const accounts = ctx.accounts
    for (let i = 0; i < accounts.length; i++) {
      await accountService.changeCategory(accounts[i].id, other.id)
    }
    await next()
  } catch (error) {
    ctx.body = new ErrorModel(null, err.message)
  }
}

module.exports = {
  verifyExists,
  getAccountsByCategotyId,
  changeAccountsCategory,
}
