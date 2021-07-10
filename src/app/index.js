const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const accountRouter = require('../router/account.router')
const categoryRouter = require('../router/category.router')
const iconRouter = require('../router/icon.router')

const app = new Koa()

app.use(bodyParser())
app.use(cors())

app.use(accountRouter.routes())
app.use(accountRouter.allowedMethods())
app.use(categoryRouter.routes())
app.use(categoryRouter.allowedMethods())
app.use(iconRouter.routes())
app.use(iconRouter.allowedMethods())

module.exports = app
