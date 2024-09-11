import mongoose from 'mongoose';

// Define the Order schema
const orderSchema = new mongoose.Schema({
          user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
          },
          cartItems: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'CartItem'
          }],
          date: {
                    type: Date,
                    default: Date.now
          },
          orderId: {
                    type: String,
                    required: true
          },
          totalPrice: {
                    type: Number,
                    required: true
          },
          status: {
                    type: Boolean,
                    required: true
          }
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

export default Order;
