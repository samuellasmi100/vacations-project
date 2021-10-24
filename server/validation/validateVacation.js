const ErrorType = require('../errors/error-type');
const ServerError = require('../errors/server-error');

//image
const validateVacation = async (vacationDetails) => {
    //Destination
    if (vacationDetails.destination === "" || vacationDetails.destination == null ) {
        throw new ServerError(ErrorType.DESTINATION);
    }
    //Price
    if (vacationDetails.price === "" || vacationDetails.price == null ) {
        throw new ServerError(ErrorType.PRICE);
    }
    //Start Date
    if (vacationDetails.startDate === "" || vacationDetails.startDate == null ) {
        throw new ServerError(ErrorType.START_DATE);
    }
    //End Date
    if (vacationDetails.endDate === "" || vacationDetails.endDate == null ) {
        throw new ServerError(ErrorType.END_DATE);
    }
    //Description
    if (vacationDetails.description === "" || vacationDetails.description == null ) {
        throw new ServerError(ErrorType.DESCRIPTION);
    }
};

module.exports = {
    validateVacation
}
