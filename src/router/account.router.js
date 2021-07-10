const Router = require('koa-router')

const {
  addAccount,
  getAccounts,
  getChartsData,
} = require('../controller/account.controller')
// const { handleDate } = require('../middleware/account.middle')

const accountRouter = new Router({ prefix: '/accounts' })

accountRouter.post('/', addAccount)
accountRouter.get('/', getAccounts)
accountRouter.get('/charts', getChartsData)

module.exports = accountRouter
