const mongoose = require('mongoose');

const ucCareerSchema = new mongoose.Schema({
    position:{
        type:String,
        required: "Please Enter Career Record"
    },
    organisation:{
        type: String,
        required: "Please Enter Attached Organisation/ Institution"
    },
    location:{
        type: String,
        required:" Please enter the place where this career was acheived"
    },
    department:{
        type:String
    
    },
    description:{
        type:String
    },
    startDate: {
        type: Date,
        default:Date.now
    },
    endDate: {
        type:Date,
        default:Date.now
    },
    current: {
        type:Boolean,
        default:false
    }
});

module.exports = ucCareerSchema;