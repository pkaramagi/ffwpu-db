const mongoose = require("mongoose");
const punishmentsSchema = require("./schema/punishments.schema");

const Punishment = mongoose.model('Punishment', punishmentsSchema);

module.exports= Punishment;