require('express-async-errors');

const winston    = require('winston');
//require('winston-mongodb');

module.exports = function(){
   // winston.add(winston.transports.Console, { colorize: true, prettyPrint: true });
    winston.add(winston.transports.File, { filename: 'services.log' });
   // winston.add(winston.transports.MongoDB, { 'db': 'mongodb://localhost/exos' });
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'services.log' }));
    process.on('unhandledRejection', (ex) => { //winston.error( ex.message , ex ); process.exit(2);
        throw ex; //for winston.handleExceptions instead
    });
    /*dbgStartup(`Application starts ...\n`              ) ;
dbgStartup(` Step 1: Check variables`              ) ;
dbgStartup(`  - application name    "${name}"`     ) ;
dbgStartup(`  - application port    "${port}"`     ) ;
dbgStartup(`  - application version "${version}"`  ) ;
dbgStartup(`  - application service "${service}"\n`) ;*/
}

/* winston.handleExceptions instead
    process.on('uncaughtException' , (ex) => {
      winston.error( ex.message , ex );
      process.exit(1);
    });*/