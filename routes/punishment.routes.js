const express = require("express");
const PunishmentController = require('../controllers/punishment.controller');


const punishmentRouter = express.Router();


punishmentRouter.post('/create/:memberid',PunishmentController.createPunishment)
punishmentRouter.get('/', PunishmentController.getPunishments);
punishmentRouter.get( '/:id',PunishmentController.getPunishmentById)
punishmentRouter.delete('/delete/:id',PunishmentController.deletePunishment)
punishmentRouter.put('/update/:id',PunishmentController.updatePunishment)


module.exports =  punishmentRouter;
