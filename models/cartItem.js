// cartItem.js

import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  oldPrice: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#000000'
  },
  size: {
    type: String,
    default: 'L'
  },
  quantity: {
    type: Number,
    default: 0
  }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
