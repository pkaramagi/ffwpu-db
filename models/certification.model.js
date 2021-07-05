const mongoose = require("mongoose");

const certificationSchema = require("./schema/certifications.schema");
const Certification = mongoose.model('Certification', certificationSchema);

module.exports = Certification;