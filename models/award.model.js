const mongoose = require('mongoose');

const awardsSchema =  require('./schema/awards.schema')

const Award = mongoose.model('Award', awardsSchema);

module.exports =  Award;