import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  itemid: {
    type: String,
    required: true
  }
});

const WishList = mongoose.model('WishList', wishlistSchema);

export default WishList;