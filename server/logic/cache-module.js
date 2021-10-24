const ErrorType = require('../errors/error-type');
const ServerError = require('../errors/server-error');

let dataMap = new Map();
const get = (token) => {
  
    if(token === null || token === undefined){
        throw new ServerError(ErrorType.UNAUTHORIZED)
    }
    return dataMap.get(token)
}
function set(key, value) {
    dataMap.set(key, value);
};

const extractUserDataFromCache = (request) => {
    let authorizationString = request.headers["authorization"];

    let token = authorizationString.substring("Bearer ".length);

    let userData = get(token);

   return userData;
};

module.exports = {
    set,
    get,
    extractUserDataFromCache,
    
};

