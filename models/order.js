import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
          user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
          },
          cartItems: [{
                    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                    quantity: Number,
                    size: String,
                    color: String,
                    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
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
          },
          paymentMethod: {
                    type: String,
                    enum: ['online', 'cod'],
          }
          
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

export default Order;
