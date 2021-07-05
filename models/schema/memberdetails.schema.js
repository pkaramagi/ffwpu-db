import memberSchema from "./member.schema";

const mongoose = require("mongoose");

const memberDetailsSchema = new mongoose.Schema({
   
    address:{
        type: mongoose.Schema.ObjectId, 
        ref: 'Address'
    },
    sundayService:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SundayService'
        }
    ],
    workshop:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Workshop'
        }
    ],

    certification:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Certifications'
        }
    ],

    career:[{
        type: mongoose.Schema.ObjectId,
        ref: 'UCCareer'
    }],

    punishment:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Punishment'
    }],

    award:[{
        type: mongoose.Schema.ObjectId,
        ref:'Award'
    }]

});

export default memberDetailsSchema;