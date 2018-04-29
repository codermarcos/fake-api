const { validate } = require('../helpers')
  , userService = require('../services/user.service');

class userController {
  constructor() { }

  async create(req, res) {
    switch (true) {
      case !req.body.hasOwnProperty('email'):
        res.status(422).send('email is require');
        break;

      case validate.email.test(req.body.email):
        res.status(422).send('Email invalid');
        break;

      case !req.body.hasOwnProperty('password'):
        res.status(422).send('Password is require');
        break;

      case validate.password.test(req.body.password):
        res.status(422).send('Password invalid');
        break;

      case await userService.exist(req.body.email):
        res.status(409).send('This email already exist');
        break;

      default:
        userService.insert(req.body)
          .then(suc => res.status(suc.status).send(suc.message))
          .catch(err => res.status(err.status).send(err.message));
    }

  }
}

module.exports = new userController();
