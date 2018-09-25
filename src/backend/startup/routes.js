const express    = require('express');
const tenants    = require('../routes/tenants');
const auths      = require('../routes/auths');
const services   = require('../routes/services');
const error      = require('../middleware/error');

module.exports = function (app , config) {
    app.use(express.json());                         //raw
    app.use(express.urlencoded({ extended: true })); //xxformencoded
    app.use(express.static('public'));
    //app.use( logger );
    app.use('/api/' + config.get('version') + '/' + config.get('service') + '/', services);
    app.use('/api/' + config.get('version') + '/tenants/', tenants);
    app.use('/api/' + config.get('version') + '/auths/', auths);
    app.use(error); //Must be in the last position
}