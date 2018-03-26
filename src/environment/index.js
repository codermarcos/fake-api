const { args } = require('../common')
  , production = require('./prod.env')
  , develop = require('./deve.env')
  , test = require('./test.env')
  , mode = args.mode;

let environment;

if (mode) {
  environment = mode !== 'test' ? develop : Object.assign(develop, test);
} else {
  environment	= Object.assign(develop, production);
}

module.exports = Object.freeze(environment);
