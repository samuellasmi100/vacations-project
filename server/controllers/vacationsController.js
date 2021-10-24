const router = require('express').Router();
const vacationsLogic = require('../logic/vacationsLogic');
const cacheModule = require('../logic/cache-module')

//Get All Vacation
router.get('/', async (req,res,next) => {
    const userId = await cacheModule.extractUserDataFromCache(req).id;
    const isAdmin = await cacheModule.extractUserDataFromCache(req).admin;
    try {
       const vacations =  await vacationsLogic.getAllVacationsByUserId(userId);
       res.json({vacations,admin:isAdmin})
    } catch (error) {
        console.log(error);
        return next(error);
    }
})

//Add A New Vacation
router.post('/', async (req,res,next) => {
    const vacationDetails = req.body;
    const isAdmin = await cacheModule.extractUserDataFromCache(req).admin;
    try {
      const vacationId = await vacationsLogic.addVacation(vacationDetails,isAdmin);
        res.json(vacationId)
    } catch (error) {
        return next(error);
    }
});

// Get One Vacation
router.get('/:id', async (req,res,next) => {
    const id = req.params.id;
    try {
       const vacation =  await vacationsLogic.getOneVacations(id);
       res.json(vacation);
    } catch (error) {
        return next(error);
    }
})

//Update Vacation
router.put('/:id', async (req,res,next) => {
    const id = req.params.id;
    const updateVacationData = req.body;
    const isAdmin = await cacheModule.extractUserDataFromCache(req).admin;

    try {
       await vacationsLogic.updateVacation(updateVacationData,id,isAdmin);
        res.json('Vacation Is Update');
    } catch (error) {
        return next(error);
    }
});

//Delet Vacation
router.delete('/:id', async (req,res) => {
    const vacationDeleteById = req.params.id;
    const isAdmin = await cacheModule.extractUserDataFromCache(req).admin;

    try {
       const vacationIdToDelet = await vacationsLogic.deleteVacation(vacationDeleteById,isAdmin);
        res.json('Vacation Is Deleted');
    } catch (error) {
        return next(error);
    }
})

module.exports = router