class BaseModel {
  constructor(data, message) {
    this.data = data
    this.message = message
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = -1
  }
}
module.exports = {
  SuccessModel,
  ErrorModel,
}
