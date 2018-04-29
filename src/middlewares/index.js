const logger = require('./logger');
const encrypt = require('./encrypt');

module.exports = app => {
  app.use((req, res, next) => logger(req, res, next));
  app.use((req, res, next) => encrypt(req, res, next));
};
