const connection = require('../app/database')

class CategoryService {
  async addCategory(name, iconName, type) {
    try {
      const statement = `INSERT INTO category (name, icon_name, type) VALUES (?, ?, ?);`
      const [result] = await connection.execute(statement, [
        name,
        iconName,
        type,
      ])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async isExistCategory(name, type) {
    try {
      const statement = `SELECT * FROM category WHERE name = ? AND type = ? AND is_delete = ?;`
      const [result] = await connection.execute(statement, [name, type, 0])
      return result.length !== 0
    } catch (err) {
      console.log(err)
    }
  }

  async getCategories(type) {
    try {
      const statement = `
        SELECT id, name, icon_name iconName, type 
        FROM category 
        WHERE type = ? AND is_delete = ?;
      `
      const [result] = await connection.execute(statement, [type, 0])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async deleteCategory(id) {
    try {
      const statement = `UPDATE category SET is_delete = ? WHERE id = ?;`
      const [result] = await connection.execute(statement, [1, id])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getAccountsByCategoryId(id) {
    try {
      const statement = `SELECT * FROM account WHERE is_delete = 0 AND category_id = ?;`
      const [result] = await connection.execute(statement, [id])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getOtherCategory(name, type) {
    try {
      const statement = `SELECT * FROM category WHERE name = ? AND type = ?;`
      const [result] = await connection.execute(statement, [name, type])
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CategoryService()
