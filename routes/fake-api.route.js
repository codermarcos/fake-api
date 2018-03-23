const express = require('express')
  , router = express.Router()

  , controllersPath = '../controllers'
  , urlController = require(`${controllersPath}/url.controller`);

router.get('/create', urlController.create);


module.exports = router;
