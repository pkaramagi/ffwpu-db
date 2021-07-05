const express = require("express");
const SundayServiceController = require('../controllers/sundayservice.controller');
const sundayServiceRouter = express.Router();

sundayServiceRouter.post('/create',SundayServiceController.createSundayService)
sundayServiceRouter.get('/', SundayServiceController.getSundayServices);
sundayServiceRouter.get( '/:id',SundayServiceController.getSundayServiceById)
sundayServiceRouter.delete('/delete/:id',SundayServiceController.deleteSundayService)
sundayServiceRouter.put('/update/:id',SundayServiceController.updateSundayService)
sundayServiceRouter.put('/update/attendee/:sundayServiceId&:memberId',SundayServiceController.addAttendeeToService);
module.exports =  sundayServiceRouter;

