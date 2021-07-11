const Router = require('koa-router')

const {
  addCategory,
  getCategories,
  deleteCategory,
} = require('../controller/category.controller')
const {
  verifyExists,
  getAccountsByCategotyId,
  changeAccountsCategory,
} = require('../middleware/category.middle')

const categoryRouter = new Router({ prefix: '/category' })

categoryRouter.post('/', verifyExists, addCategory)
categoryRouter.get('/', getCategories)
categoryRouter.delete(
  '/:id',
  getAccountsByCategotyId,
  changeAccountsCategory,
  deleteCategory
)
// categoryRouter.get('/:id/accounts', getAccountsByCategotyId)

module.exports = categoryRouter
