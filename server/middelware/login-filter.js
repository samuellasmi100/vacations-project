const expressJwt = require('express-jwt');
const config = require('../config.json');
const ErrorType = require('../errors/server-error');
const ServerError = require('../errors/server-error');
// Extracting the text from the secret's JSON
let { secret } = config;

let whiteListUrls = new Set();
whiteListUrls.add('/users/login');
whiteListUrls.add('/users/register');


function authenticateJwtRequestToken() {
    return expressJwt({ secret, algorithms: ['sha1', 'RS256', 'HS256'] }).unless(request => {
        if (request.method == 'POST' && request.url.endsWith('/users')) {
            return true;
        }
        // If the url resides in our whitelist urls
        if (whiteListUrls.has(request.url)) {
            return true;
        }
      
        return false;

    });


}

module.exports = authenticateJwtRequestToken;