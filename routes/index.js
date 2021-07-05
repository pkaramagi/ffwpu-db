const express = require("express");
const punishments = require("./punishment.routes");
const awards = require("./award.routes");
const certifications = require("./certification.routes");
const uccareer = require("./uccareer.routes");
const address = require ("./address.routes");
const workshop = require("./workshop.routes");
const sundayService = require("./sundayservice.routes");
const member = require("./member.routes");
const router = express.Router();

router.use('/punishments', punishments);
router.use('/awards', awards);
router.use('/certifications', certifications);
router.use('/uccareers', uccareer);
router.use('/address', address);
router.use('/workshops',workshop);
router.use('/sundayservice',sundayService);
router.use('/member', member);
module.exports = router;