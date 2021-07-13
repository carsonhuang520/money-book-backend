const Router = require('koa-router')

const {
  addAccount,
  getAccounts,
  getChartsData,
  getTotal,
  deleteAccount
} = require('../controller/account.controller')
const { verifyAuth } = require('../middleware/user.middleware')

const accountRouter = new Router({ prefix: '/accounts' })

accountRouter.post('/', verifyAuth, addAccount)
accountRouter.get('/', verifyAuth, getAccounts)
accountRouter.get('/charts', verifyAuth, getChartsData)
accountRouter.get('/total', verifyAuth, getTotal)
accountRouter.delete('/:id', verifyAuth, deleteAccount)

module.exports = accountRouter
