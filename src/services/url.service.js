
const { connection, selectFields } = require('./database.service');

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
    const { _fields, _values } = selectFields(fields, values);

    const sql = `INSERT INTO ${db_name}.urls (${_fields.join()}) VALUES (${_values.join()})`
      , db = connection();

    await db.connect();

    const result = await db.query(sql);

    await db.end();

    return result.rowCount > 0 ?
      { status: 200, message: 'Inserted with sucess' } :
      { status: 500, message: 'Cannot be insert' };
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
