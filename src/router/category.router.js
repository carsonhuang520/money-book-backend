const Router = require('koa-router')

const {
  addCategory,
  getCategories,
  deleteCategory,
} = require('../controller/category.controller')
const { verifyExists } = require('../middleware/category.middle')

const categoryRouter = new Router({ prefix: '/category' })

categoryRouter.post('/', verifyExists, addCategory)
categoryRouter.get('/', getCategories)
categoryRouter.delete('/:id', deleteCategory)

module.exports = categoryRouter
