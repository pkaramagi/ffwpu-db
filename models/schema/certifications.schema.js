const mongoose = require('mongoose');

const certificationsSchema = new mongoose.Schema({
    name: {
        type:String,
        required: "Please enter Certification"
    },
    institution:{
        type:String,
        required: "Please enter Certifying Institution"
    },
    date:{
        type:Date,
        default:Date.now
    },
    remarks:{
        type:String,
    }
    
}); 

module.exports = certificationsSchema;