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
      for (let i = 0; i < result.length; ) {
        let item = result[i]
        if (item.name === '其他' && i < result.length - 2) {
          result.splice(i, 1)
          result.push(item)
        } else if (item.name === '编辑' && i < result.length - 1) {
          result.splice(i, 1)
          result.push(item)
        } else {
          i++
        }
      }
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
    // 1、找到id的分类
    // 2、查看该分类下的账单
    // 3、把分类下的账单移到其他分类下面
    // 4、再把该分类删除
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
