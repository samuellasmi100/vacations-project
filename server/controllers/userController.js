const router = require('express').Router();
const userLogic = require('../logic/userLogic');
const cacheModule = require('../logic/cache-module')

//Get all users
router.get('/', async (req, res, next) => {
    try {
        const allUsers = await userLogic.allUsers();
        res.json(allUsers);
    } catch (error) {
        return next(error);
    }
})

//Register Route
router.post('/', async (req, res, next) => {
    const userRegistaionDetails = req.body;
    try {
        await userLogic.register(userRegistaionDetails);
        res.json('Registration Was successful');
    } catch (error) {
        return next(error);
    }
});

//Login Route
router.post('/login', async (req, res, next) => {
    const userLoggedDetails = req.body;
    try {
        const user = await userLogic.login(userLoggedDetails);
        res.json(user);
    } catch (error) {
        return next(error);
    }
});

//Update User Route
router.put('/', async (req, res, next) => {
    const updateUserData = req.body;
    try {
        const user = await userLogic.updateUser(updateUserData);
        res.json(user);
    } catch (error) {
        return next(error);
    }
});

//Get One User Route
router.get('/:id', async (req, res, next) => {
    const getUserId = cacheModule.extractUserDataFromCache(req).id;
    try {
        const user = await userLogic.getOneUser(getUserId);
        res.json(user);
    } catch (error) {
        return next(error);
    }
});

// Delete User Route
router.delete('/:id', async (req, res, next) => {
    const getUserId = cacheModule.extractUserDataFromCache(req).id;
     try {
        await userLogic.deleteUser(getUserId);
        res.json({ msg: `User deleted` });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;