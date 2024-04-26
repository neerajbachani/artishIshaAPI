const mongoose = require('mongoose');

const ourFeaturedProductSchema = new mongoose.Schema({
    
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

const ourFeaturedProduct = mongoose.model('ourFeaturedProduct', ourFeaturedProductSchema)
module.exports = ourFeaturedProduct