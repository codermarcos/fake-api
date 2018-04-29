const { 
  connection
  , whereFields 
  , insertFields
} = require('./database.service');

const { db_name } = require('../environment');


const fields = {
  id      : (value) => value
  , email   : (value) => `'${value}'`
  , password: (value) => `'${value}'`
};

class userService {

  constructor() { }

  async insert(values) {
    const { _fields, _values } = insertFields(fields, values);

    const sql = `INSERT INTO ${db_name}.users (${_fields.join()}) VALUES (${_values.join()})`
      , db = connection();

    await db.connect();

    const result = await db.query(sql);

    await db.end();

    switch (true) {
      case result.rowCount > 0:
        return { status: 200, message: 'Inserted with sucess' };
    
      default:
        return { status: 500, message: 'Cannot be insert' };
    }
  }

  async login(values) {
    const conditions = whereFields(fields, values);

    const sql = `SELECT * FROM ${db_name}.users WHERE ${conditions.join(' AND ')}`
      , db = connection();

    await db.connect();

    const result = await db.query(sql);

    await db.end();

    switch (true) {
      case result.rowCount !== 1:
        throw { status: 404, message: 'This route not exist' };

      case result.rowCount > 1:
        throw { status: 422, message: 'This has problem' };

      default:
        return result.rows[0];
    }
  }

  async exist({ email }) {
    const sql = `SELECT * FROM ${db_name}.urls WHERE email='${email}'`
      , db = connection();

    await db.connect();

    const result = await db.query(sql);

    await db.end();

    return result.rowCount > 0;
  }
}

module.exports = new userService();
