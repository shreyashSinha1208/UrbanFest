import allCartItem from '../models/allcartItem.js';
import CartItem from '../models/cartItem.js';
import User from '../models/user.js';

export const addCartItem = async (req, res) => {
          try {
                    const userId = req.session.user.id;

                    const cartItem = new CartItem(req.body);
                    await cartItem.save();

          
                    const newAllCartItem = new allCartItem({
                              ...req.body,
                              cartItemId: cartItem._id 
                    });
                    await newAllCartItem.save();
                    await User.findByIdAndUpdate(
                              userId,
                              { $push: { cartItems: cartItem._id } },
                              { new: true }
                    );
                    res.status(200).json(cartItem);
          } catch (error) {
                    console.error('Error adding item to cart:', error);
                    res.status(500).json({ message: 'Error adding item to cart', error });
          }
};

export const deleteCartItem = async (req, res) => {
          try {
                    const userId = req.session.user.id;
                    await CartItem.findByIdAndDelete(req.params.id);
                    await User.findByIdAndUpdate(userId, { $pull: { cartItems: req.params.id } }, { new: true });
                    const cartItems = await User.findById(userId).populate('cartItems');
                    res.send(cartItems);
          } catch (error) {
                    res.status(500).json({ message: 'Error deleting item from cart', error });
          }
};

export const getCartItems = async (req, res) => {
          try {
                    const userId = req.session.user.id;
                    const user = await User.findById(userId).populate('cartItems');
                    res.send(user.cartItems);
          } catch (error) {
                    res.status(500).json({ message: 'Error retrieving cart items', error });
          }
};
