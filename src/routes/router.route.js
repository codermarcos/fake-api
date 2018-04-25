const routerController = require('../controllers/router.controller')
  , express = require('express')
  , router = express.Router();

router.get('/', routerController.index);
router.get('/*', routerController.router);
router.put('/*', routerController.router);
router.post('/*', routerController.router);
router.patch('/*', routerController.router);
router.delete('/*', routerController.router);

module.exports = router;
