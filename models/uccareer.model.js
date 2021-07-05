const mongoose = require("mongoose");

const ucCareerSchema = require("./schema/uccareer.schema");
const UCCareer = mongoose.model('UCCareer', ucCareerSchema);

module.exports = UCCareer;