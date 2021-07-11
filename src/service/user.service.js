const connection = require('../app/database')

class UserService {
  async login() {}

  async logout() {}

  async register(username, password) {
    try {
      const statement = `INSERT INTO user (username, password) VALUES (?, ?);`
      const [result] = await connection.execute(statement, [username, password])
      return result
    } catch (err) {
      throw err
    }
  }

  async isExist(username) {
    try {
      const statement = `SELECT * FROM user WHERE username = ? AND is_delete = ?;`
      const [result] = await connection.execute(statement, [username, 0])
      return result[0]
    } catch (err) {
      throw err
    }
  }
}

module.exports = new UserService()
