const connection = require('../app/database')

class IconService {
  async getIcons() {
    try {
      const statement = `SELECT id, icon_name iconName FROM new_category WHERE is_delete = ?;`
      const [result] = await connection.execute(statement, [0])
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new IconService()
