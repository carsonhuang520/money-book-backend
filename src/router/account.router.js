const Router = require('koa-router')

const { addAccount, getAccounts } = require('../controller/account.controller')

const accountRouter = new Router({ prefix: '/accounts' })

accountRouter.post('/', addAccount)
accountRouter.get('/', getAccounts)

module.exports = accountRouter
