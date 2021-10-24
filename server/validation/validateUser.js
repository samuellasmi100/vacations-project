const ErrorType = require('../errors/error-type');
const ServerError = require('../errors/server-error');

 const validateRegister = async (userRegistaionDetails) => {
    //First Name
    if (userRegistaionDetails.firstName === "" || userRegistaionDetails.firstName == null ) {
        throw new ServerError(ErrorType.FIRST_NAME_VALIDATE);
    }
    //Last Name
    if (userRegistaionDetails.lastName === "" || userRegistaionDetails.lastName == null ) {
        throw new ServerError(ErrorType.LAST_NAME_VALIDATE);
    }
    //Email
    if (userRegistaionDetails.email === "" || userRegistaionDetails.email == null ) {
        throw new ServerError(ErrorType.EMAIL_VALIDATE);
    }
    //password
    if (userRegistaionDetails.password === "" || userRegistaionDetails.password == null ) {
        throw new ServerError(ErrorType.PASSWORD_VALIDATE);
    }
    //valid Email
    if (!isEmailFormat(userRegistaionDetails.email)) {
        throw new ServerError(ErrorType.EMAIL_FORMAT)
    }

    //Password Length
    if (userRegistaionDetails.password.length < 6) {
        throw new ServerError (ErrorType.PASSWORD_TO_SHORT)
        
    }
    //Password Length
    if (userRegistaionDetails.password.length > 15) {
        throw new ServerError (ErrorType.PASSWORD_TO_LONG)
        
 };

};

const validateLogin = (userLoggedDetails) => {
    //Email
    if (userLoggedDetails.email === "" || userLoggedDetails.email == null ) {
        throw new ServerError(ErrorType.EMAIL_VALIDATE);
    }
    //password
    if (userLoggedDetails.password === "" || userLoggedDetails.password == null ) {
        throw new ServerError(ErrorType.PASSWORD_VALIDATE);
    }
    //Valid Email
    if (!isEmailFormat(userLoggedDetails.email)) {
        throw new ServerError(ErrorType.EMAIL_FORMAT)
    }

    //Password Length
    if (userLoggedDetails.password.length < 6) {
        throw new ServerError (ErrorType.PASSWORD_TO_SHORT)
        
    }
    //Password Length
    if (userLoggedDetails.password.length > 15) {
        throw new ServerError (ErrorType.PASSWORD_TO_LONG)
        
 };
}
//Helping function to check if username in email format
const isEmailFormat = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

module.exports = {
    validateRegister,
    validateLogin
};

