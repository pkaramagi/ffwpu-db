const mongoose = require('mongoose');

const addressSchema= new mongoose.Schema({
    type: {
        type:String,
        required: true
    },
    village:{
        type:String,
        required: true
    }
        ,
    district:{
        type:String,
        required: true
    },
   region:{
        type:String,
        required: true
    },

   country:{
       type:String,
       required: true
   }

  });

  module.exports = addressSchema;