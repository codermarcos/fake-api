const url = require('./url.route')
  , root = require('./root.route');

module.exports = (app) => {
  app.use('/', root);
  app.use('/url', url);
};
