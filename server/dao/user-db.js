const db = require('./connection-wrapper');
const ErrorType = require('../errors/error-type');
const ServerError = require('../errors/server-error');

//Get All Users
const allUsers = async () => {
    let sql = 'SELECT * FROM users';

    try {
        return await db.execute(sql)
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
}

// Register
const register = async (user) => {

    const { firstName, lastName, email, password } = user;

    const sql = 'INSERT INTO users(first_name,last_name,email,password) VALUES(?,?,?,?);';

    const parameters = [firstName, lastName, email, password];
    
    try {
       await db.executeWithParameters(sql, parameters)
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
};

//Login
const login = async (email) => {
    let sql = "SELECT id,is_admin as 'admin',password,email FROM users WHERE email = ?";

    let parameters = [email];

    try {
        const idUser = await db.executeWithParameters(sql, parameters);
        return idUser;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

// Get Onec User
const getOneUser = async (user) => {
    let sql = 'SELECT * FROM users WHERE id = ?';

    const parameters = [user]
    try {
        return await db.executeWithParameters(sql, parameters)
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

//Update User
const updateUser = async (updateUserData) => {

    const { firstName, lastName, email } = updateUserData;

    let sql = "UPDATE users SET first_name = ? ,last_name = ? WHERE email = ?";

    let parameters = [firstName, lastName, email];

    try {
        await db.executeWithParameters(sql, parameters);

    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

//Delete User
const deleteUser = async (userDeleteById) => {

    const sql = 'DELETE FROM users WHERE id=?';

    const parameters = [userDeleteById];

    try {
        await db.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

//Validation Before Registration
const isUserExistByEmail = async (email) => {
    const sql = 'SELECT * FROM users Where email=?';

    const parameters = [email];

    try {
        const user = await db.executeWithParameters(sql, parameters);
        if (user === null || user.length === 0) {
            return false
        }
        return true
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR,e, sqlMessage);
    };
};


module.exports = {
    register,
    deleteUser,
    isUserExistByEmail,
    getOneUser,
    updateUser,
    allUsers,
    login,
};