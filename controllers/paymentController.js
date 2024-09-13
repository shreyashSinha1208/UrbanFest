import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import User from '../models/user.js';
import Order from '../models/order.js';
import CartItem from '../models/cartItem.js';
import AllCartItem from '../models/allcartItem.js';
import mongoose from 'mongoose';
dotenv.config();


const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

export const createOrder = async (req, res) => {
  try {
    const { amount, status } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount provided' });
    }
    const receiptId = `receipt_${Date.now()}`;
    const userId = req.user.id;
    const user = await User.findById(userId).populate('cartItems');

    if (!user) return res.status(404).json({ message: 'User not found' });

    const cartItems = user.cartItems;

    const options = {
      amount: amount,
      currency: 'INR',
      receipt: receiptId,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    const order = new Order({
      user: userId,
      cartItems: [],
      orderId: razorpayOrder.id,
      date: new Date(),
      totalPrice: amount / 100,
      status: status,
    });

    cartItems.forEach(item => {
      order.cartItems.push(item._id); // Push the _id of each cart item
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      order: order,
    });
  } catch (error) {

    console.error('Error creating order:', error);

    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message || 'Internal Server Error',
    });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findOneAndUpdate({ orderId: orderId }, { status: true });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all orders for the user
    const orders = await Order.find({ user: userId }).exec();
    
    const allCartItemIds = orders.flatMap(order => order.cartItems);
    const objectIds = allCartItemIds.map(id => new mongoose.Types.ObjectId(id));

    const allCartItems = await AllCartItem.find({ cartItemId: { $in: objectIds } }).exec();

    const cartItemDetails = allCartItems.reduce((acc, item) => {
      acc[item.cartItemId.toString()] = item; // Use cartItemId to map details
      return acc;
    }, {});
    
    const ordersWithDetails = orders.map(order => {
      const populatedCartItems = order.cartItems.map(cartItemId => cartItemDetails[cartItemId.toString()] || null);
      return {
        ...order.toObject(),
        cartItems: populatedCartItems
      };
    });    
    res.json({ success: true, orders: ordersWithDetails });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
