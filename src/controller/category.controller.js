class CategoryController {
  async addCategory(ctx, next) {
    ctx.body = '创建分类成功'
  }

  async getCategories(ctx, next) {
    ctx.body = '获取分类列表'
  }
}

module.exports = new CategoryController()
