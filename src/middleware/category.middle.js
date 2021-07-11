const accountService = require('../service/account.service')
const categoryService = require('../service/category.service')

const verifyExists = async (ctx, next) => {
  const { type, name } = ctx.request.body
  try {
    const isExist = await categoryService.isExistCategory(name, type)
    if (isExist) {
      ctx.body = {
        message: '该类别已经存在！！！',
        code: 1000,
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

const getAccountsByCategotyId = async (ctx, next) => {
  const { id } = ctx.params
  try {
    const result = await categoryService.getAccountsByCategoryId(id)
    // console.log(result)
    ctx.accounts = result
    await next()
  } catch (err) {
    ctx.body = {
      message: err.message,
      code: 1000,
    }
  }
}

const changeAccountsCategory = async (ctx, next) => {
  const { type } = ctx.query
  try {
    const other = await categoryService.getOtherCategory('其他', type)
    // console.log(other)
    const accounts = ctx.accounts
    for (let i = 0; i < accounts.length; i++) {
      await accountService.changeCategory(accounts[i].id, other.id)
    }
    await next()
  } catch (error) {}
}

module.exports = {
  verifyExists,
  getAccountsByCategotyId,
  changeAccountsCategory,
}
