const connection = require('../app/database')

class AccountService {
  async addAccount(description, price, categoryId, date) {
    try {
      const statement = `
        INSERT INTO account (description, date, price, category_id) VALUES (?, ?, ?, ?);
      `
      console.log(description, price, categoryId, date)
      const [result] = await connection.execute(statement, [
        description,
        date,
        price,
        categoryId,
      ])
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getAccounts(date) {
    try {
      const statement = `
        SELECT 
          a.id accountId, a.description, a.price, DATE_FORMAT(a.date, '%Y-%m-%d') time,
          c.type, c.name categoryName, c.icon_name iconName
        FROM account a 
        LEFT JOIN category c 
        ON a.category_id = c.id
        WHERE a.is_delete = ? AND DATE_FORMAT(a.date,'%Y-%m') = ? 
        ORDER BY a.date DESC;
      `
      const [result] = await connection.execute(statement, [0, date])
      return result
    } catch (error) {
      throw error
    }
  }

  async getChartsData(date, type) {
    try {
      const statement = `
        SELECT 
          a.id accountId, a.description, a.price, DATE_FORMAT(a.date, '%Y-%m-%d') time,
          c.type, c.name categoryName, c.icon_name iconName
        FROM account a 
        LEFT JOIN category c 
        ON a.category_id = c.id
        WHERE a.is_delete = ? AND c.type = ? AND DATE_FORMAT(a.date,'%Y-%m') = ? 
        ORDER BY a.date DESC;
      `
      const [result] = await connection.execute(statement, [0, type, date])
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = new AccountService()
