const fake_api = require('./fake-api.route');

module.exports = {
  start(app) {
    app.use('/fake-api', fake_api);
  }
};
