class AccountController {
  async addAccount(ctx, next) {
    ctx.body = '创建账单成功'
  }

  async getAccounts(ctx, next) {
    ctx.body = '获取账单列表'
  }
}

module.exports = new AccountController()
