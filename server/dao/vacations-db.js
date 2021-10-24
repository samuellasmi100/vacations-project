const db = require('./connection-wrapper');
const ErrorType = require('../errors/error-type');
const ServerError = require('../errors/server-error');

const getAllVacations = async (id) => {
    const sql = `SELECT v.id as vacationId, v.destination, v.description,
    v.image, DATE_FORMAT(v.start_date, '%d/%m/%Y') AS startDate, DATE_FORMAT(v.end_date,'%d/%m/%Y') AS endDate,
    v.price, followed_vacations.user_id AS userId,  

    (SELECT COUNT(*) FROM followed_vacations          
    WHERE vacation_id = v.id) AS numOfFollowers  

    FROM vacations v 

    LEFT JOIN followed_vacations  ON v.id=followed_vacations.vacation_id && followed_vacations.user_id= ?      
    ORDER BY followed_vacations.user_id DESC`          

   const user = [id];
    try {
       return await db.executeWithParameters(sql,user);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

const addVacation = async (vacation ) => {

    const { destination,price ,startDate,endDate,description,image} = vacation
    const sql = 
   'INSERT INTO vacations (destination,price,start_date,end_date,description,image) VALUE(?,?,?,?,?,?)'
    const parameters = [destination , price ,startDate, endDate,description,image];
 
   try {
      const vacationId = await db.executeWithParameters(sql,parameters);
      return vacationId.insertId
   } catch (e) {
     throw new ServerError(ErrorType.GENERAL_ERROR,sql,e)
 
   }
 };
 


const getOneVacations = async (getVacationId) => {
    const sql = 'SELECT * FROM vacations WHERE id = ?';
    const parameters = [getVacationId];

    try {
        return await db.executeWithParameters(sql,parameters)
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)   
    }
};


const updateVacation = async (updateVacationData,id) => {
   const {destination ,price ,startDate,endDate,description} = updateVacationData

    let sql = 
    "UPDATE vacations SET destination=?, price = ?,start_date = ?,end_date =?,description = ? WHERE id = ?";
   const parameters = [destination,price ,startDate, endDate,description,id];
   try {
    await db.executeWithParameters(sql,parameters);
} catch (e) {
  throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
  }
};


const deleteVacation = async (VacationDeleteById) => {
    const sql = 'DELETE FROM vacations WHERE id=?';
    const parameters = [VacationDeleteById]
    try {
        await db.executeWithParameters(sql,parameters)
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
}

module.exports = {
    addVacation,
    getAllVacations,
    deleteVacation,
    getOneVacations,
    updateVacation,
}