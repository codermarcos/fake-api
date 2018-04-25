const urlController = require('../controllers/url.controller')
  , express = require('express')
  , router = express.Router();

router.post('/create', urlController.create);

module.exports = router;
