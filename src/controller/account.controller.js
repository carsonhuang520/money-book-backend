const accountService = require('../service/account.service')
const { momentToDate } = require('../utils/format')

class AccountController {
  async addAccount(ctx, next) {
    let { date, description, categoryId, price } = ctx.request.body
    console.log(date)
    date = momentToDate(date, 'YYYY/MM/DD HH:mm')
    try {
      const result = await accountService.addAccount(
        description,
        price,
        categoryId,
        date
      )
      if (result) {
        ctx.body = {
          message: '创建账单成功~~~',
          code: 0,
          data: null,
        }
      } else {
        ctx.body = {
          message: '创建账单失败！！！',
          code: 1000,
          data: null,
        }
      }
    } catch (error) {
      ctx.body = {
        message: error.message,
        code: 1000,
      }
    }
  }

  async getAccounts(ctx, next) {
    const { date } = ctx.query
    try {
      const result = await accountService.getAccounts(date)
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

  async getChartsData(ctx, next) {
    const { type, date } = ctx.query
    try {
      const result = await accountService.getChartsData(date, type)
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

  async getTotal(ctx, next) {
    const { date } = ctx.query
    try {
      const result = await accountService.getTotal(date)
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

module.exports = new AccountController()
