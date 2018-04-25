const url = require('./url.route')
  , router = require('./router.route');

module.exports = (app) => {
  app.use('/', router);
  app.use('/url', url);
};
