const mongoose = require("mongoose");

const memberDetailsSchema = require('./schema/memberdetails.schema');
const MemberDetails = mongoose.model('MemberDetails', memberDetailsSchema);

export default MemberDetails;