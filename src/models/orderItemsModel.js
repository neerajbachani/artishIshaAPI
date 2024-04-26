const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    // required: true,
  },
  discountedPrice: {
    type: Number,

   },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const OrderItem = mongoose.model('orderItems', orderItemSchema)
module.exports = OrderItem
