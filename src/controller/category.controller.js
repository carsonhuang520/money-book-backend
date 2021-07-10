const categoryService = require('../service/category.service')

class CategoryController {
  async addCategory(ctx, next) {
    const { name, iconName, type } = ctx.request.body
    try {
      const result = await categoryService.addCategory(name, iconName, type)
      if (result) {
        ctx.body = {
          message: '类别创建成功~~~',
          code: 0,
          data: null,
        }
      } else {
        ctx.body = {
          message: '类别创建失败！！！',
          code: 1000,
          data: null,
        }
      }
    } catch (error) {
      ctx.body = {
        message: '错误！！！',
        code: 1000,
      }
    }
  }

  async getCategories(ctx, next) {
    const { type } = ctx.query
    try {
      const result = await categoryService.getCategories(type)
      ctx.body = {
        message: 'success',
        code: 0,
        data: result,
      }
    } catch (error) {
      ctx.body = {
        message: error.message,
        code: 1000,
      }
    }
  }

  async deleteCategory(ctx, next) {
    const { id } = ctx.params
    try {
      const result = await categoryService.deleteCategory(id)
      if (result) {
        ctx.body = {
          message: '删除成功',
          code: 0,
          data: null,
        }
      } else {
        ctx.body = {
          message: '删除失败',
          code: 1000,
          data: null,
        }
      }
    } catch (error) {
      ctx.body = {
        message: error.message,
        code: 1000,
      }
    }
  }
}

module.exports = new CategoryController()