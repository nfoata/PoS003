// Dependencies

const dbgStartup = require('debug')('app:startup');
const dbgDb      = require('debug')('app:db');

const os         = require('os');
const helmet     = require('helmet');
const morgan     = require('morgan');
//const pipelinlogger     = require('./middleware/logger.js');

// Step 1: Retrieve logging configuration

// Step 2: Launch the logging
require('./startup/logging')();

// Step 3: Launch the application scaffold
const express    = require('express'); 
const app        = express();

// Step 4: Retrieve the global configuration
const config = require('config');
const name = config.get('app') || process.env.APP || 'APP';
const port = config.get('port') || process.env.PORT || 2802;
const version = config.get('version') || process.env.VERSION || "api/v1";
const service = config.get('service') || process.env.SERVICE || "exos";
require('./startup/config')(config);

// Step 5: Retrieve the os configuration
const hostname   = os.hostname();


// OS information

dbgStartup(` Step 2: Check host`          ) ;
//dbgStartup(`  - hostname "${hostname}"\n` ) ;

// Express load templating engine
//app.set('view engine','pug');
//app.set('views','./views');


// Middleware functions
if ( app.get('env') ==='development' ) {
  app.use( morgan('tiny') );
}
app.use( helmet() );
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Accept-Type', 'application/json');
  if ('OPTIONS' === req.method) {
    return res.status(200).send();
  } else {
    next();
  }
};
app.use(allowCrossDomain);
require('./startup/routes')(app,config);

dbgStartup('');
dbgStartup('Step 3) Services :');
dbgStartup( ' - Tenant service path is /api/' + config.get('version')+ '/tenants/' );
dbgStartup( ' - Main service path is /api/' + config.get('version') + '/' + config.get('service') + '/' );
dbgStartup('');

require('./startup/db')();

const server = require('./startup/security')(app,config);

module.exports = server;

