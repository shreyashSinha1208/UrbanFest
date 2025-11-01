import nodemailer from 'nodemailer';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import User from '../models/user.js';
import Order from '../models/order.js';
import mongoose from 'mongoose';

dotenv.config();

const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'urbanfest.help@gmail.com',
    pass: 'hdeh sbpu pemv oohf',
  },
});

// Generate Gmail-optimized email template
const generateOrderEmailHTML = (order, user) => {
  const orderDate = new Date(order.date);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <div itemscope itemtype="http://schema.org/EmailMessage">
    <div itemprop="potentialAction" itemscope itemtype="http://schema.org/ViewAction">
      <meta itemprop="name" content="View Order">
      <meta itemprop="url" content="https:/urbanfest.netlify.app/orders/${order.orderId}">
    </div>
    <div itemprop="description" content="Order confirmation for ${order.orderId}"></div>
  </div>
  
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Order Confirmed!</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Thank you for your purchase</p>
            </td>
          </tr>

          <!-- Order Summary Box -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 5px 0;">
                      <span style="color: #6c757d; font-size: 14px;">Order ID</span>
                      <div style="color: #212529; font-size: 16px; font-weight: 600; margin-top: 4px;">${order.orderId}</div>
                    </td>
                    <td style="padding: 5px 0; text-align: right;">
                      <span style="color: #6c757d; font-size: 14px;">Order Date</span>
                      <div style="color: #212529; font-size: 16px; font-weight: 600; margin-top: 4px;">${formatDate(orderDate)}</div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Delivery Timeline -->
              <div style="background-color: #e8f5e9; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width: 50%; padding-right: 10px;">
                      <div style="color: #2e7d32; font-size: 14px; font-weight: 600; margin-bottom: 8px;">📦 Order Placed</div>
                      <div style="color: #4caf50; font-size: 13px;">${formatDate(orderDate)}</div>
                      <div style="color: #66bb6a; font-size: 12px;">${formatTime(orderDate)}</div>
                    </td>
                    <td style="width: 50%; padding-left: 10px; border-left: 2px solid #a5d6a7;">
                      <div style="color: #2e7d32; font-size: 14px; font-weight: 600; margin-bottom: 8px;">🚚 Estimated Delivery</div>
                      <div style="color: #4caf50; font-size: 13px;">${formatDate(deliveryDate)}</div>
                      <div style="color: #66bb6a; font-size: 12px;">Within 7 business days</div>
                    </td>
                  </tr>
                </table>
              </div>

              <h2 style="margin: 0 0 20px; color: #212529; font-size: 20px; font-weight: 600;">Order Items</h2>
              
              ${order.cartItems.map((item, index) => `
                <div style="border-bottom: ${index === order.cartItems.length - 1 ? 'none' : '1px solid #e9ecef'}; padding: 20px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width: 70%; vertical-align: top;">
                        <div style="font-size: 16px; color: #212529; font-weight: 600; margin-bottom: 8px;">
                          ${item.productId.name || 'Product'}
                        </div>
                        <div style="font-size: 14px; color: #6c757d; margin-bottom: 4px;">
                          ${item.productId.description ? item.productId.description.substring(0, 60) + '...' : ''}
                        </div>
                        <div style="margin-top: 12px;">
                          ${item.size ? `<span style="display: inline-block; background-color: #e9ecef; padding: 4px 12px; border-radius: 4px; font-size: 12px; color: #495057; margin-right: 8px;">Size: ${item.size}</span>` : ''}
                          ${item.color ? `<span style="display: inline-block; background-color: #e9ecef; padding: 4px 12px; border-radius: 4px; font-size: 12px; color: #495057; margin-right: 8px;">Color: <span style="display: inline-block; width: 12px; height: 12px; background-color: ${item.color}; border: 1px solid #dee2e6; border-radius: 50%; vertical-align: middle; margin-left: 4px;"></span></span>` : ''}
                          <span style="display: inline-block; background-color: #e9ecef; padding: 4px 12px; border-radius: 4px; font-size: 12px; color: #495057;">Qty: ${item.quantity}</span>
                        </div>
                      </td>
                      <td style="width: 30%; text-align: right; vertical-align: top;">
                        <div style="font-size: 18px; color: #212529; font-weight: 600;">
                          ₹${((item.productId.price || 0) * item.quantity).toLocaleString('en-IN')}
                        </div>
                        ${item.quantity > 1 ? `<div style="font-size: 12px; color: #6c757d; margin-top: 4px;">₹${(item.productId.price || 0).toLocaleString('en-IN')} each</div>` : ''}
                      </td>
                    </tr>
                  </table>
                </div>
              `).join('')}

              <!-- Total Section -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e9ecef;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #6c757d; font-size: 14px;">Subtotal</span>
                    </td>
                    <td style="text-align: right; padding: 8px 0;">
                      <span style="color: #212529; font-size: 14px;">₹${order.totalPrice.toLocaleString('en-IN')}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #6c757d; font-size: 14px;">Delivery Charges</span>
                    </td>
                    <td style="text-align: right; padding: 8px 0;">
                      <span style="color: #28a745; font-size: 14px; font-weight: 600;">FREE</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-top: 1px solid #e9ecef;">
                      <span style="color: #212529; font-size: 18px; font-weight: 600;">Total Amount</span>
                    </td>
                    <td style="text-align: right; padding: 12px 0; border-top: 1px solid #e9ecef;">
                      <span style="color: #212529; font-size: 20px; font-weight: 700;">₹${order.totalPrice.toLocaleString('en-IN')}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Payment Method -->
              <div style="margin-top: 25px; padding: 16px; background-color: #fff3cd; border-radius: 6px; border-left: 4px solid #ffc107;">
                <span style="color: #856404; font-size: 14px; font-weight: 600;">💳 Payment Method: </span>
                <span style="color: #856404; font-size: 14px;">${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; color: #6c757d; font-size: 14px;">Questions about your order?</p>
              <p style="margin: 0; color: #6c757d; font-size: 14px;">Contact us at <a href="mailto:urbanfest.help@gmail.com" style="color: #667eea; text-decoration: none;">urbanfest.help@gmail.com</a></p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                <p style="margin: 0; color: #adb5bd; font-size: 12px;">© ${new Date().getFullYear()} UrbanFest. All rights reserved.</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (order, userEmail) => {
  try {
    const mailOptions = {
      from: {
        name: 'UrbanFest',
        address: 'urbanfest.help@gmail.com'
      },
      to: userEmail,
      subject: `Order Confirmed - ${order.orderId} 🎉`,
      html: generateOrderEmailHTML(order, { email: userEmail }),
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error: error.message };
  }
};

export const createOrder = async (req, res) => {
  console.log('createOrder invoked with request body:', req.body);
  try {
    const { amount, status, paymentMethod } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount provided' });
    }

    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: 'cartItems',
      populate: { path: 'productId' }
    });

    if (!user) {
      console.log('User not found for id:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItems = user.cartItems;
    console.log('User cart items:', cartItems);

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let orderId = '';
    if (paymentMethod === 'cod') {
      orderId = `COD${Date.now()}`;
    } else {
      const options = {
        amount: amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      };

      const razorpayOrder = await razorpayInstance.orders.create(options);
      orderId = razorpayOrder.id;
    }

    const order = new Order({
      user: userId,
      cartItems: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      orderId,
      date: new Date(),
      totalPrice: amount / 100,
      status,
      paymentMethod,
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
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
    const userId = req.user.id;

    // Update order status
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { status: true },
      { new: true }
    ).populate('cartItems.productId');

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Clear user cart
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { cartItems: [] } },
      { new: true }
    );

    // Send order confirmation email
    const emailResult = await sendOrderConfirmationEmail(
      updatedOrder,
      'sinhashreyash110@gmail.com'
    );

    if (!emailResult.success) {
      console.warn('Failed to send confirmation email:', emailResult.error);
    }

    res.json({
      success: true,
      user: user,
      emailSent: emailResult.success,
      message: 'Order confirmed successfully'
    });
  } catch (error) {
    console.log('Error updating order status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate('cartItems.productId')
      .populate('cartItems.reviewId')
      .exec();

    res.json({ success: true, orders });
  } catch (error) {
    console.log('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateOrderRating = async (req, res) => {
  // Implementation for rating updates
};