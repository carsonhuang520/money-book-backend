const { SuccessModel, ErrorModel } = require('../model/res.model')
const categoryService = require('../service/category.service')

class CategoryController {
  async addCategory(ctx, next) {
    const { name, iconName, type } = ctx.request.body
    try {
      const result = await categoryService.addCategory(name, iconName, type)
      if (result) {
        ctx.body = new SuccessModel(null, '类别创建成功')
      } else {
        ctx.body = new ErrorModel(null, '类别创建失败')
      }
    } catch (error) {
      ctx.body = new ErrorModel(null, error.message)
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
      ctx.body = new SuccessModel(result, 'success')
    } catch (error) {
      ctx.body = new ErrorModel(null, error.message)
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
        ctx.body = new SuccessModel(null, '删除成功')
      } else {
        ctx.body = new ErrorModel(null, '删除失败')
      }
    } catch (error) {
      ctx.body = new ErrorModel(null, error.message)
    }
  }
}

module.exports = new CategoryController()
