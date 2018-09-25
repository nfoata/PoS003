

module.exports = function admin( req, res, next ) {
    if (!req.tenant.isAdmin) return res.status(403).send('Access denied.');
    next();
}
