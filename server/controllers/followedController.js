const router = require('express').Router();
const followdLogic = require('../logic/followdLogic');
const cacheModule = require('../logic/cache-module');

router.put('/follow/:id', async (req,res,next) => {
    const vacationid = req.params.id;
    try {
     const userId = await cacheModule.extractUserDataFromCache(req).id;
      await followdLogic.addFollowVacation(userId,vacationid);
       res.json(`vacation Is addede To Your Favorite`);
   } catch (error) {
       return next(error);
   }
});

router.delete('/unfollow/:id', async (req,res,next) => {
    const vacationid = req.params.id;
    try {
     const userId = await cacheModule.extractUserDataFromCache(req).id;
      await followdLogic.deleteFollowVacation(userId,vacationid);
       res.json('Vacation Remove From Your List');
   } catch (error) {
       return next(error);
   }
});

module.exports = router