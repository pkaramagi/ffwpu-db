const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    code: {
        tpye: String,
    },

    firstName:{
        type: String
    },
    middleName:{
        type: String
    },
    lastName: {
        type: String
    },
    nationality:{
        type: String
    },
    dob:{
        type: Date
    },
    sdob:{
        type: Date
    },

    passportNo:{
        type: String,
        unique: true
    },
    nationalID:{
        type: String,
        unique:true
    },
    avatar:{
        type: String
    },
    sex:{
        type: String
    },
    generation:{
        type: String
    },
    religiousAff:{
        type: String
    },
    foreignLangs:[
        {
            name: {type: String, default:undefined} ,
            level: {type: String, default:undefined}

        }
    ]  , 
    
    addresses:[{
        type: mongoose.Schema.ObjectId, 
        ref: 'Address'
    }],
    sundayService:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SundayService',
            unique : true
        }
    ],
    workshops:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Workshop'
        }
    ],

    certifications:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Certification'
        }
    ],

    uccareers:[{
        type: mongoose.Schema.ObjectId,
        ref: 'UCCareer'
    }],

    punishments:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Punishment'
    }],

    awards:[{
        type: mongoose.Schema.ObjectId,
        ref:'Award'
    }]
});


module.exports = memberSchema;