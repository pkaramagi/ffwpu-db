const mongoose = require("mongoose");

const memberSchema = require("./schema/member.schema");
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
