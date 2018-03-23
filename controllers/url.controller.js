const urlService = require('../services/url.service');

class urlController {
  constructor() { }

  create(req, res) {
    const params = {
      url: 'teste'
    };
    urlService.insert(params)
      .then(suc => res.status(200).send(suc))
      .catch(err => res.status(500).send(err.stack));
  }
}

module.exports = new urlController();
