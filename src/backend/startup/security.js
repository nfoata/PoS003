const fs = require('fs');
const https = require('https');

module.exports = function (app , config) {
    return https.createServer( 
        {
            key: fs.readFileSync('./security/server.key'),
            cert: fs.readFileSync('./security/server.cert')
        }, 
        app).listen( config.get('port') , () => {
            console.log("Listen on port "+config.get('port')+"...");
        });
    
}