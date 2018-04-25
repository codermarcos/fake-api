const { Client } = require('pg');

const { 
  db_user
  , db_host
  , db_name
  , db_pass
  , db_port
} = require('../environment');

const connection = () => new Client({
  database: db_name
  , password: db_pass
  , host    : db_host
  , user    : db_user
  , port    : db_port
});

const insertFields = (fields, values) => {  
  const _values = []
    , _fields = [];

  for (const field in values) {
    if (!values.hasOwnProperty(field)) continue;
      
    const isValid = fields[field]
      , value   = values[field]
      , valid   = isValid(value);
        
    _fields.push(field);
    _values.push(valid);
  }

  return { _fields, _values };
};

const whereFields = (fields, values) => {  
  const conditions = [];

  for (const field in values) {
    if (!values.hasOwnProperty(field)) continue;
      
    const isValid = fields[field]
      , value   = values[field]
      , valid   = isValid(value);
        
    conditions.push(`${field}=${valid}`);
  }

  return conditions;
};

module.exports = { connection, insertFields, whereFields };
