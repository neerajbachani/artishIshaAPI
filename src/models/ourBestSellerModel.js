const mongoose = require('mongoose');

const ourBestSellerSchema = new mongoose.Schema({
    
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
    }
});

const OurBestSeller = mongoose.model('ourBestSeller', ourBestSellerSchema)
module.exports = OurBestSeller