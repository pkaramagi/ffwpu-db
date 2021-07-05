const mongoose = require("mongoose");

const workshopSchema = require("./schema/workshop.schema");
const Workshop = mongoose.model('Workshop',workshopSchema)
module.exports = Workshop;