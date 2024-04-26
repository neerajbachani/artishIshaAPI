const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        // required: true,
      },
      discountedPrice: {
        type: Number,
        // required: true,
      },
      discount: {
        type: Number,
      
      },
      description1: {
        type: String,
        
      },
      description2: {
        type: String,
       
      },
      description3: {
        type: String,
      },
      details: {
        type: String,
        required: true,
      },
      color: {
        type: String,  
      },
      resin: {
        type: String,  
      },
      varmalaPreservation: {
        type: String,
      },
      resinRawMaterials:{
        type: String,  
      },
      digitalArt: {
        type: String,  
      },
      festivalSpecial: {
        type: String,
      },
      lippanArt: {
        type: String,
      },
      business: {
        type: String,
      },
      jewel: {
        type: String,  
      },
      vintage:{
        type: String,
      },
      geodeArt: {
        type: String,
      },     
      image: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
      },
      ratings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings",
      }],
      reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      }],
      ratingCount:[{
        type: Number,
        default: 0,
      }],
      
      // category:[{
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "categories",
      // }],
      createdAt: {
        type: Date,
        default: Date.now(),
      }
});

const Product = mongoose.model('products',productSchema)
module.exports = Product