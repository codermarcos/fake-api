const 
      express = require('express')
    , router  = express.Router()

    , controllersPath = '../controllers'
    , routeController = require(`${controllersPath}/route.controller`) 
  ;

router.get('/create', routeController.create);
  

module.exports = router;