
function log ( req, res, next) {
    console.log( "Logging ... Take information about the customer" );
    next(); // Continue the pipeline process
}

module.exports = log;