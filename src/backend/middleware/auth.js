// Code checked the 20/09/2018 r1
const jwt        = require('jsonwebtoken');
const config     = require('config');

function auth( req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied. No token provided');
    }
    try {
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.tenant = decodedPayload;
        next();
    } catch (ex) {
        return res.status(400).send('Invalid token');
    }
}

module.exports = auth;