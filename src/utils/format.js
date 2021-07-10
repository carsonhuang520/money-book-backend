const moment = require('moment')

const formatDate = (date, format) => {
  return moment(date).format(format)
}

const momentToDate = (str, format) => {
  return moment(str, format).toDate()
}

module.exports = {
  formatDate,
  momentToDate,
}
