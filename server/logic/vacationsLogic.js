const vacationsDb = require('../dao/vacations-db');
const validate = require('../validation/validateVacation');
const ErrorType = require('../errors/error-type');
const ServerError = require('../errors/server-error');

//Get All Vacation
const getAllVacationsByUserId = async (userId) => {
      return await vacationsDb.getAllVacations(userId);
};

//Add New Vacation
const addVacation = async (vacationDetails, isAdmin) => {
      if (isAdmin === 1) {
            await validate.validateVacation(vacationDetails);
            return await vacationsDb.addVacation(vacationDetails);
      }
      throw new ServerError(ErrorType.ACCESS_DENIDE)
};

//Get One Vacation
const getOneVacations = async (getVacationId) => {
      return await vacationsDb.getOneVacations(getVacationId);
};

//Updata Vacation
const updateVacation = async (updateVacationid, id, isAdmin) => {
      if (isAdmin === 1) {
            await validate.validateVacation(updateVacationid);
            return await vacationsDb.updateVacation(updateVacationid, id);

      }
      throw new ServerError(ErrorType.ACCESS_DENIDE)

};

//Delete Vacation
const deleteVacation = async (VacationDeleteById, isAdmin) => {
      if (isAdmin === 1) {
           return await vacationsDb.deleteVacation(VacationDeleteById);
      }
      throw new ServerError(ErrorType.ACCESS_DENIDE)
};

module.exports = {
      addVacation,
      getAllVacationsByUserId,
      deleteVacation,
      getOneVacations,
      updateVacation,
}