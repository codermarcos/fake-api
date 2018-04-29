const { args } = require('../common')
  , urlService = require('../services/url.service');

class routerController {
  constructor() { }

  index(req, res) {
    res.status(200).send(`<center style="font-size: 5em; font-family: 'Arial'; line-height: 95vh;">Api works in ${args.mode}</center>`);
  }

  router(req, res) {
    const resquest = {
      url   : req.url
      , method: req.method
    };

    urlService.search(resquest)
      .then(suc => res.status(suc.status).send(suc.body))
      .catch(err => res.status(err.status).send(err.message));
  }
}

module.exports = new routerController();
