const mongoose = require('mongoose');

const sundayServiceSchema = new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    preacher:{
        type:String,

    },
    sermonTitle: {
        type: String,
        required: 'Please Enter sermon title'
    },
    location: {
        type: String,
    },
    attendees:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Member'

    }]
    
})

module.exports = sundayServiceSchema;