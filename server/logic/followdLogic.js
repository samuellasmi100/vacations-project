const followedDb = require('../dao/followed-db');

const addFollowVacation = async (userId, vacationid) => {
    return await followedDb.addFollowVacation(userId, vacationid)
}
const deleteFollowVacation = async(userId, vacationid) => {
    await followedDb.deleteFollowVacation(userId, vacationid)
}
module.exports = {
    addFollowVacation,
    deleteFollowVacation
}