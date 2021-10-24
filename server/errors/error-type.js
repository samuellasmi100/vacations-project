let ErrorType = {
    
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "Something Went Worng Please Try Again'", isShowStackTrace: true},
    USER_NAME_ALREADY_EXIST : {id: 2, httpCode: 601, message : "User name already exist", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "Login failed, invalid user name or password", isShowStackTrace: false},
    USER_NAME_NOT_EXIST : {id: 4, httpCode: 601, message : "User name not exist", isShowStackTrace: false},
    FIRST_NAME_VALIDATE : {id: 5,httpCode: 603, message : "First Name Is Require", isShowStackTrace: false },
    LAST_NAME_VALIDATE : {id: 6,httpCode: 603, message : "Last Name Is Require", isShowStackTrace: false },
    EMAIL_VALIDATE : {id: 7,httpCode: 603, message : "Email Is Require", isShowStackTrace: false },
    EMAIL_FORMAT : {id: 8,httpCode: 603, message : "Please Enter A Valid Email", isShowStackTrace: false },
    PASSWORD_VALIDATE : {id: 9,httpCode: 603, message : "Password Is Require", isShowStackTrace: false },
    PASSWORD_TO_SHORT : {id: 10,httpCode: 603, message : "Please Enter A Password With At Least 6 Characters", isShowStackTrace: false },
    PASSWORD_TO_LONG : {id: 11,httpCode: 603, message : "Please Enter A Password With No Longer Then 15 Characters", isShowStackTrace: false },
    DESTINATION : {id: 12,httpCode: 603, message : "Destination Is Require", isShowStackTrace: false },
    DESCRIPTION : {id: 13,httpCode: 603, message : "Description Is Require", isShowStackTrace: false },
    PRICE : {id: 14,httpCode: 603, message : "Price Is Require", isShowStackTrace: false },
    START_DATE : {id: 15,httpCode: 603, message : "Start Date Is Require", isShowStackTrace: false },
    END_DATE : {id: 16,httpCode: 603, message : "End Date Is Require", isShowStackTrace: false },
    IMAGE : {id: 17,httpCode: 603, message : "Image Is Require", isShowStackTrace: false },
    ACCESS_DENIDE : {id: 18,httpCode: 603, message : "Sorry, You Are Not Allowed To Access This Page", isShowStackTrace: false }
}


module.exports = ErrorType;