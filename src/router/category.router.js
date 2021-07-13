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
const { verifyAuth } = require('../middleware/user.middleware')

const categoryRouter = new Router({ prefix: '/category' })

categoryRouter.post('/', verifyAuth, verifyExists, addCategory)
categoryRouter.get('/', verifyAuth, getCategories)
categoryRouter.delete(
  '/:id',
  verifyAuth,
  getAccountsByCategotyId,
  changeAccountsCategory,
  deleteCategory
)
// categoryRouter.get('/:id/accounts', getAccountsByCategotyId)

module.exports = categoryRouter
