const url = require('./url.route');

module.exports = {
  start(app) {
    app.use('/url', url);
  }
};
