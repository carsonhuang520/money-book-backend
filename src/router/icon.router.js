const Router = require('koa-router')

const { getIcons } = require('../controller/icon.controller')

const iconRouter = new Router({ prefix: '/icons' })

iconRouter.get('/', getIcons)

module.exports = iconRouter
