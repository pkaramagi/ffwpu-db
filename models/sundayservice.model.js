const mongoose = require("mongoose");

const sundayServiceSchema = require("./schema/sundayservice.schema");
const SundayService = mongoose.model('SundayService',sundayServiceSchema)
module.exports = SundayService;