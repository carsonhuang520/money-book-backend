const path = require('path')
const fs = require('fs')

const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')

const accountRouter = require('../router/account.router')
const categoryRouter = require('../router/category.router')
const iconRouter = require('../router/icon.router')
const userRouter = require('../router/user.router')

const app = new Koa()

const logFile = path.join(__dirname, '../../logs/')
if (!fs.existsSync(logFile)) {
  fs.mkdirSync(logFile)
}
const fileWriterStream = fs.createWriteStream(logFile + 'access.log', {
  flags: 'a',
})

app.use(bodyParser())
app.use(cors())
app.use(
  morgan('combined', {
    stream: fileWriterStream,
  })
)

app.use(accountRouter.routes())
app.use(accountRouter.allowedMethods())
app.use(categoryRouter.routes())
app.use(categoryRouter.allowedMethods())
app.use(iconRouter.routes())
app.use(iconRouter.allowedMethods())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app
