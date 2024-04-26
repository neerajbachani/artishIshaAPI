const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
    
    image: {
        type: String,
    },
  
    title:{
        type: String,
    },
 
 
    link:{
        type: String,
        required: true,
    },
 
});

const HeroSection = mongoose.model('heroSection', heroSectionSchema)
module.exports = HeroSection