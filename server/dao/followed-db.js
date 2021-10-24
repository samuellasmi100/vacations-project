const db = require('./connection-wrapper');
const ErrorType = require('../errors/error-type');
const ServerError = require('../errors/server-error');

const addFollowVacation = async (userId,vacationid) => {
    const sql = `insert into followed_vacations (user_id,vacation_id) values (?,?);`
    const parameters = [userId,vacationid];
    try {
        return await db.executeWithParameters(sql,parameters)
     } catch (e) {
         throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
     }
}

const deleteFollowVacation = async  (userId,vacationid) => {
    let sql = 'delete FROM followed_vacations where user_id=? and vacation_id = ?;'
    const parameters = [userId,vacationid];
    try {
        return await db.executeWithParameters(sql,parameters)
     } catch (e) {
         throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
     }
}
module.exports = {
    addFollowVacation,
    deleteFollowVacation
}