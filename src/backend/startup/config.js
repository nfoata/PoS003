

module.exports = function (config) {
   
    if (!config.get('jwtPrivateKey')) {
        throw new Error('Application shutdwon because JWT private key is not defined');
        
    }
}