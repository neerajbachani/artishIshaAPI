const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    mobile: {
        type: String,
        required: true
    },
    

},
)
addressSchema.set('toJSON', {
    transform: function(doc, ret) {
      delete ret.user; // Remove the 'user' property from the serialized object
      return ret;
    }
  });

const Address = mongoose.model('addresses',addressSchema)
module.exports = Address