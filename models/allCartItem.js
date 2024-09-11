import mongoose from 'mongoose';

// Define the schema for AllCartItem
const allCartItemSchema = new mongoose.Schema({
          // Reference to the CartItem model
          cartItemId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'CartItem',  // Make sure this matches the model name for CartItem
                    required: true
          },
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
          },
});

// Create the model for AllCartItem
const AllCartItem = mongoose.model('AllCartItem', allCartItemSchema);

export default AllCartItem;
