const mongoose = require('mongoose');
const { Schema } = mongoose;

const Upload_del = new Schema({
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true,
       
    },
    dob:{
        type: String,
        required: true,
        trim: true,
    },
    mobile_number:{
        type: Number,
        required: true,
        minlength: 10
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  const details = mongoose.model('Upload_del',Upload_del);
  module.exports = details

