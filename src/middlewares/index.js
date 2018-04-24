const logger = require('./logger');

module.exports = app => {
  app.use((req, res, next) => logger(req, res, next));
};
