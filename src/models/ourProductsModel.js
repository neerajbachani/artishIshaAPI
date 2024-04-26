const mongoose = require('mongoose');

const ourProductSchema = new mongoose.Schema({
    
    image: {
        type: String,
    },
  
    title:{
        type: String,
    },
 
    price:{
        type: Number,
    },

    discountedPrice:{
        type: Number
    },

    link: {
        type: String,
    },
    type: {
        type: String,
    },
});

const ourProduct = mongoose.model('ourProduct', ourProductSchema)
module.exports = ourProduct