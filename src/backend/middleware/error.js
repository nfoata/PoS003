const winston    = require('winston');

module.exports = function (err, res, req, next) {
    winston.error( err.message , err);
    res.status(500).send("Internal server error");
}