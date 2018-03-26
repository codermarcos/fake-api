const urlService = require('../services/url.service');

class urlController {
  constructor() { }

  async create(req, res) {
    const notExistUrl = !req.body.hasOwnProperty('url') || req.body.url.toString().length === 0;
    const alreadyExist = await urlService.exist(req.body);

    switch (true) {
      case notExistUrl:
        res.status(422).send('Url cannot be empty');
        break;
      case alreadyExist:
        res.status(409).send('This route already exist');
        break;
      default:
        urlService.insert(req.body)
          .then(suc => res.status(suc.status).send(suc.message))
          .catch(err => res.status(err.status).send(err.message));
    }

  }
}

module.exports = new urlController();
