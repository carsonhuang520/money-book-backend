const Router = require('koa-router')

const {
  addCategory,
  getCategories,
} = require('../controller/category.controller')

const categoryRouter = new Router({ prefix: '/category' })

categoryRouter.post('/', addCategory)
categoryRouter.get('/', getCategories)

module.exports = categoryRouter
