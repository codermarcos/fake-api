'use strict';
/*  
  Get version
 */
const { 
  name
  , version
} = require('./package.json');

/*  
  Get environment
 */
const {
  mode
  , host
  , port
} = require('./environment');

/*  
  Get dependencies
 */
const express = require('express')
  , http    = require('http')
  , app     = express()

  , routes  = require('./routes');


/**
 * @function start
 * 
 * @description
 * Set up the HTTP server to listen on the correct
 */
function start() {
  routes.start(app); 
    
  http.createServer(app)
    .listen(port, () => console.log(`${name} started in mode ${mode} on http://${host}:${port}/ on version ${version}.`));
}

start();
