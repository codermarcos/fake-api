const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
  if (req.body && typeof req.body === 'object' && req.body.hasOwnProperty('password')) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      req.body.password = hash;
      next();
    });
  } else {
    next();
  }
};


    