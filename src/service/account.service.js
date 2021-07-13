const connection = require('../app/database')

class AccountService {
  async addAccount(description, price, categoryId, date, userId) {
    try {
      const statement = `
        INSERT INTO account (description, date, price, category_id, user_id) VALUES (?, ?, ?, ?, ?);
      `
      const [result] = await connection.execute(statement, [
        description,
        date,
        price,
        categoryId,
        userId,
      ])
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getAccounts(date, userId) {
    try {
      const statement = `
        SELECT 
          a.id accountId, a.description, a.price, DATE_FORMAT(a.date, '%Y-%m-%d') time,
          c.type, c.name categoryName, c.icon_name iconName
        FROM account a 
        LEFT JOIN category c 
        ON a.category_id = c.id
        WHERE a.is_delete = ? AND a.user_id = ? AND DATE_FORMAT(a.date,'%Y-%m') = ? 
        ORDER BY a.date DESC;
      `
      const [result] = await connection.execute(statement, [0, userId, date])
      return result
    } catch (error) {
      throw error
    }
  }

  async getChartsData(date, type, userId) {
    try {
      const statement = `
        SELECT 
          a.id accountId, a.description, a.price, DATE_FORMAT(a.date, '%Y-%m-%d') time,
          c.type, c.name categoryName, c.icon_name iconName
        FROM account a 
        LEFT JOIN category c 
        ON a.category_id = c.id
        WHERE a.is_delete = ? AND a.user_id =? AND c.type = ? AND DATE_FORMAT(a.date,'%Y-%m') = ? 
        ORDER BY a.date DESC;
      `
      const [result] = await connection.execute(statement, [
        0,
        userId,
        type,
        date,
      ])
      return result
    } catch (error) {
      throw error
    }
  }

  async getTotal(date, userId) {
    try {
      const statement = `
        SELECT SUM(a.price) total, c.type 
        FROM account a 
        LEFT JOIN category c 
        ON a.category_id = c.id 
        WHERE a.is_delete = ? AND a.user_id = ? AND DATE_FORMAT(a.date,'%Y-%m') = ? 
        GROUP BY c.type;
      `
      const [result] = await connection.execute(statement, [0, userId, date])
      return result
    } catch (error) {
      throw error
    }
  }

  async changeCategory(id, categoryId) {
    try {
      const statement = `UPDATE account SET category_id = ? WHERE id = ?;`
      const [result] = await connection.execute(statement, [categoryId, id])
      return result
    } catch (error) {
      throw err
    }
  }

  async deleteAccountById(id) {
    try {
      const statement = `UPDATE account SET is_delete = ? WHERE  id = ?;`
      const [result] = await connection.execute(statement, [1, id])
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = new AccountService()
