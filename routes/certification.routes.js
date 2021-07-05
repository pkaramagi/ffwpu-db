const express = require("express");
const CertificationController = require('../controllers/certification.controller');


const certificationRouter = express.Router();


certificationRouter.post('/create/:memberid',CertificationController.createCertification)
certificationRouter.get('/', CertificationController.getCertifications);
certificationRouter.get( '/:id',CertificationController.getCertificationById)
certificationRouter.delete('/delete/:id',CertificationController.deleteCertification)
certificationRouter.put('/update/:id',CertificationController.updateCertification)


module.exports =  certificationRouter;
