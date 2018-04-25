const routerController = require('../controllers/router.controller')
  , express = require('express')
  , router = express.Router();

router.get('/', routerController.index);
router.get('/*', routerController.router);

module.exports = router;
