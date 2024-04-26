const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    
    link:{
        type: String,
        required: true,
    },
 
});

const Gallery = mongoose.model('gallery', gallerySchema)
module.exports = Gallery