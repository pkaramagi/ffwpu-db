
const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({

    type:{
        type:String,
        required: "Select Workshop Type"
    },
    title: {
        type:String,
        required: "Please enter Workshop Title"
    },
    theme:{
        type:String,
    },

    location:{
        type: String,
        required: "Please Enter Where this workshop was held"
    },
    
    startDate:{
        type:Date,
        default: Date.now
    },
    
    endDate:{
        type:Date,
        default: Date.now
    },

    details:{
        type:String,
    },

    attendees:[
        {
            type:mongoose.Schema.ObjectId,
            ref: 'Member',          
        }
    ]

});

module.exports = workshopSchema;