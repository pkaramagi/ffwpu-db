const express = require("express");
const WorkshopController = require('../controllers/Workshop.controller');
const workshopRouter = express.Router();

workshopRouter.post('/create',WorkshopController.createWorkshop)
workshopRouter.get('/', WorkshopController.getWorkshops);
workshopRouter.get( '/:id',WorkshopController.getWorkshopById)
workshopRouter.delete('/delete/:id',WorkshopController.deleteWorkshop)
workshopRouter.put('/update/:id',WorkshopController.updateWorkshop)
workshopRouter.put('/update/attendee/:workshopId/:memberId',WorkshopController.addAttendeeToWorkshop)

module.exports =  workshopRouter;

