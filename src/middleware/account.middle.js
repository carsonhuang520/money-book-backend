const { formatDate } = require('../utils/format')

const handleDate = async (ctx, next) => {
  let { date } = ctx.request.body
  date = formatDate(date, 'YYYY/MM/DD HH:mm')
  await next()
}

module.exports = { handleDate }
