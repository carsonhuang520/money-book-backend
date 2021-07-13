const { SuccessModel, ErrorModel } = require('../model/res.model')
const accountService = require('../service/account.service')
const { momentToDate } = require('../utils/format')

class AccountController {
  async addAccount(ctx, next) {
    let { date, description, categoryId, price } = ctx.request.body
    const { id } = ctx.user
    date = momentToDate(date, 'YYYY/MM/DD HH:mm')
    try {
      const result = await accountService.addAccount(
        description,
        price,
        categoryId,
        date,
        id
      )
      if (result) {
        ctx.body = new SuccessModel(null, '创建账单成功')
      } else {
        ctx.body = new ErrorModel(null, '创建账单失败')
      }
    } catch (error) {
      ctx.body = new ErrorModel(null, error.message)
    }
  }

  async getAccounts(ctx, next) {
    const { date } = ctx.query
    const { id } = ctx.user
    try {
      const result = await accountService.getAccounts(date, id)
      ctx.body = new SuccessModel(result, 'success')
    } catch (error) {
      ctx.body = new ErrorModel(null, error.message)
    }
  }

  async getChartsData(ctx, next) {
    const { type, date } = ctx.query
    const { id } = ctx.user
    try {
      const result = await accountService.getChartsData(date, type, id)
      ctx.body = new SuccessModel(result, 'success')
    } catch (error) {
      ctx.body = new ErrorModel(null, error.message)
    }
  }

  async getTotal(ctx, next) {
    const { date } = ctx.query
    const { id } = ctx.user
    try {
      const result = await accountService.getTotal(date, id)
      ctx.body = new SuccessModel(result, 'success')
    } catch (error) {
      ctx.body = new ErrorModel(null, error.message)
    }
  }

  async deleteAccount(ctx, next) {
    const { id } = ctx.params
    try {
      const result = await accountService.deleteAccountById(id)
      if (result) {
        ctx.body = new SuccessModel(null, '删除成功')
      }
    } catch (err) {
      ctx.body = new ErrorModel(null, err.message)
    }
  }
}

module.exports = new AccountController()
