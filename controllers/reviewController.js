import Review from '../models/review.js';
import Product from '../models/product.js';
import Order from '../models/order.js';

export const createReview = async (req, res) => {
  try {
    const { rating, reviewText, productId, orderId } = req.body;
    const userId = req.user.id;
    console.log(req.body);
    
    const newReview = new Review({
      author: userId,
      rating,
      reviewText,
      orderId,
      productId
    });

    const savedReview = await newReview.save();
    
  
    const product = await Product.findById(productId);
    if (product) {
      product.review.push(savedReview._id);
      await product.save();
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { 
        orderId: orderId,
        'cartItems.productId': productId 
      },
      { 
        $set: { 'cartItems.$.reviewId': savedReview._id }
      },
      { new: true }
    ).populate('cartItems.reviewId');

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order or product not found in order',
      });
    }

    const reviewsByProduct = await Product.findById(productId).populate({
      path: 'review',
      populate: {
        path: 'author',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review: savedReview,
      reviewsByProduct: reviewsByProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId, productId } = req.body;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check authorization
    if (review.author.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this review',
      });
    }

    // Remove reviewId from the order's cartItem
    if (review.orderId) {
      await Order.findOneAndUpdate(
        { 
          orderId: review.orderId,
          'cartItems.productId': productId 
        },
        { 
          $unset: { 'cartItems.$.reviewId': "" }
        }
      );
    }

    // Delete review
    await Review.findByIdAndDelete(reviewId);
    
    // Remove review from product
    const product = await Product.findById(productId);
    if (product) {
      product.review.pull(reviewId);
      await product.save();
    }

    // Get updated reviews
    const reviewsByProduct = await Product.findById(productId).populate({
      path: 'review',
      populate: {
        path: 'author',
      },
    });

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
      review: reviewsByProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};