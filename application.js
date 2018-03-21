'use strict';
/*  
  Get version
 */
const { 
    name
  , version
} = require('./package.json');

const 
      express = require('express')
    , http    = require('http')
    , app     = express()

    , routes  = require('./routes')
  ;


/**
 * @function start
 * 
 * @description
 * Set up the HTTP server to listen on the correct
 */
function start() {
  const 
      port = process.env.PORT || 3000
    , mode = process.env.NODE_ENV || 'production'
    , host = process.env.NODE_ENV === 'production' ? 'fake-api.com' : 'localhost';
  
  routes.start(app); 

  http.createServer(app)
    .listen(port, () => console.log(`${name} started in mode ${mode} on http://${host}:${port}/ on version ${version}.`));
}

start();