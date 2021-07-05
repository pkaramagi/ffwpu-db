const express = require("express");
const UCCareerController = require('../controllers/uccareer.controller');
const ucCareerRouter = express.Router();

ucCareerRouter.post('/create/:memberid',UCCareerController.createUcCareer);
ucCareerRouter.get('/', UCCareerController.getUcCareers);
ucCareerRouter.get( '/:id',UCCareerController.getUcCareerById);
ucCareerRouter.delete('/delete/:id',UCCareerController.deleteUcCareer);
ucCareerRouter.put('/update/:id',UCCareerController.updateUcCareer);


module.exports =  ucCareerRouter;

