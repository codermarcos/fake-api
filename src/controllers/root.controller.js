const { args } = require('../common');

class rootController {
  constructor() { }

  index(req, res) {
    if (req.url === '/') {
      res.status(200).send(`<center style="font-size: 5em; font-family: 'Arial'; line-height: 95vh;">Api works in ${args.mode}</center>`);
    } else {
      console.log(req.url);
    }
  }
}

module.exports = new rootController();
