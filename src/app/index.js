const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const accountRouter = require('../router/account.router')
const categoryRouter = require('../router/category.router')

const app = new Koa()

app.use(bodyParser())

app.use(accountRouter.routes())
app.use(accountRouter.allowedMethods())
app.use(categoryRouter.routes())
app.use(categoryRouter.allowedMethods())

module.exports = app
