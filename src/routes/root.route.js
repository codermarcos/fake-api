const express = require('express')
  , router = express.Router()

  , controllersPath = '../controllers'
  , rootController = require(`${controllersPath}/root.controller`);

router.get('/', rootController.index);



module.exports = router;
