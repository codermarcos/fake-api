const urlService = require('../services/url.service');

class urlController {
  constructor() { }

  async create(req, res) {
    const invalidWords = ['/url', '/urls', '@', '.', ','];

    switch (true) {
      case !req.body.hasOwnProperty('url'):
        res.status(422).send('Url is require');
        break;

      case req.body.url.toString().length === 0:
        res.status(422).send('Url cannot be empty');
        break;

      case invalidWords.includes(req.body.url):
        res.status(422).send('Url is not allowed');
        break;

      case !req.body.url.startsWith('/'):
        res.status(422).send('Url at least one bar');
        break;

      case await urlService.exist(req.body):
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
