const mongoose = require('mongoose');

const awardsSchema = new mongoose.Schema({
    title: {
        type:String,
        required: "Please Enter Award Title"
    },
    issuer:{
        type: String,
        required: "Please Enter the issuer of this award"
    },
    remarks:{
        type: String,
    }
});

module.exports = awardsSchema;