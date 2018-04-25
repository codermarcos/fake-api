
const { 
  connection
  , whereFields 
  , insertFields
} = require('./database.service');

const { db_name } = require('../environment');

const fields = {
  id         : (value) => !value || Number.isInteger(value) ? value : new Error('Id is not a number')
  , url        : (value) => value ? `'${value}'` : new Error('Url is not defined')
  , status     : (value) => !value || Number.isInteger(value) ? value : new Error('Id is not a number')
  , method     : (value) => `'${value}'`
  , body       : (value) => `'${value}'`
  , return_type: (value) => `'${value}'`
};

class urlService {

  constructor() { }

  async insert(values) {
    const { _fields, _values } = insertFields(fields, values);

    const sql = `INSERT INTO ${db_name}.urls (${_fields.join()}) VALUES (${_values.join()})`
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

  async search(values) {
    const conditions = whereFields(fields, values);

    const sql = `SELECT * FROM ${db_name}.urls WHERE ${conditions.join(' AND ')}`
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

  async exist({ url, method }) {
    const sql = `SELECT * FROM ${db_name}.urls WHERE url='${url}' AND method='${method || 'GET'}'`
      , db = connection();

    await db.connect();

    const result = await db.query(sql);

    await db.end();

    return result.rowCount > 0;
  }
}

module.exports = new urlService();
