const production = require('./prod.env')
  , develop = require('./deve.env')
  , environment = process.env.NODE_ENV ? develop : Object.assign(develop, production);

module.exports = Object.freeze(environment);
