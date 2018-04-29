const { args } = require('../common')
  , { validate } = require('../helpers')
  , urlService = require('../services/url.service');

class routerController {
  constructor() { }

  index(req, res) {
    res.status(200).send(`<center style="font-size: 5em; font-family: 'Arial'; line-height: 95vh;">Api works in ${args.mode}</center>`);
  }

  router(req, res) {

    switch (true) {
      case !req.hasOwnProperty('url'):
        res.status(422).send('Url is require');
        break;

      case req.url.toString().length < 4:
        res.status(422).send('Url invalid');
        break;

      case validate.url.test(req.url):
        res.status(422).send('Url is not allowed');
        break;

      default:
        urlService.search({
          url   : req.url
          , method: req.method
        })
          .then(suc => {
            if (suc.headers && Object.keys(suc.headers).length > 0) {              
              for (const key in suc.headers) {
                res.setHeader(key, suc.headers[key]);
              }
            }

            res.status(suc.status).send(suc.body);
          }
          )
          .catch(err => res.status(err.status).send(err.message));

    }
  }
}

module.exports = new routerController();
