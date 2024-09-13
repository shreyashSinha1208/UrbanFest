import Review from '../models/review.js';
import Product from '../models/product.js';

export const createReview = async (req, res) => {
          try {
                    const { rating, reviewText, productId } = req.body;
                    const userId = req.user.id;

                    const newReview = new Review({
                              author: userId,
                              rating,
                              reviewText,
                    });

                    const savedReview = await newReview.save();
                    const product = await Product.findById(productId);
                    const author = await Review.find().populate('author');

                    if (product) {
                              product.review.push(savedReview._id);
                              await product.save();

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
                              review: reviewsByProduct
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
                    console.log(reviewId, productId, userId);
                    
                    const review = await Review.findById(reviewId);
                    if (!review) {
                              return res.status(404).json({
                                        success: false,
                                        message: 'Review not found',
                              });
                    }


                    if (review.author._id.toString() !== userId.toString()) {
                              return res.status(403).json({
                                        success: false,
                                        message: 'You are not authorized to delete this review',
                              });
                    }

                    await Review.findByIdAndDelete(reviewId);
                    const product = await Product.findById(productId);
                    if (product) {
                              product.review.pull(reviewId);
                              await product.save();
                    }

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
          }
          catch (error) {
                    res.status(500).json({
                              success: false,
                              message: error.message,
                    });
          }
};
