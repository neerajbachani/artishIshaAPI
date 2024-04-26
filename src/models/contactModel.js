const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    
    name: {
        type: String,
    },
  
    email:{
        type: String,
    },
 
 
    phone:{
        type: String,
        required: true,
    },

    message:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      }
 
});

const Contact = mongoose.model('contact', contactSchema)
module.exports = Contact