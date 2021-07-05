const mongoose = require('mongoose');
const addressSchema = require('./schema/address.schema')

const Address = mongoose.model('Address', addressSchema);

module.exports =  Address;