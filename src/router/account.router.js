const Router = require('koa-router')

const {
  addAccount,
  getAccounts,
  getChartsData,
  getTotal,
} = require('../controller/account.controller')
// const { handleDate } = require('../middleware/account.middle')

const accountRouter = new Router({ prefix: '/accounts' })

accountRouter.post('/', addAccount)
accountRouter.get('/', getAccounts)
accountRouter.get('/charts', getChartsData)
accountRouter.get('/total', getTotal)

module.exports = accountRouter
