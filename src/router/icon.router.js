const Router = require('koa-router')

const { getIcons } = require('../controller/icon.controller')
const { verifyAuth } = require('../middleware/user.middleware')

const iconRouter = new Router({ prefix: '/icons' })

iconRouter.get('/', verifyAuth, getIcons)

module.exports = iconRouter
