const express = require("express");
const AwardController = require('../controllers/award.controller');


const awardRouter = express.Router();


awardRouter.post('/create/:memberid',AwardController.createAward)
awardRouter.get('/', AwardController.getAwards);
awardRouter.get( '/:id',AwardController.getAwardById)
awardRouter.delete('/delete/:id',AwardController.deleteAward)
awardRouter.put('/update/:id',AwardController.updateAward)


module.exports =  awardRouter;
