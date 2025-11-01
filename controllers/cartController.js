import User from '../models/user.js';
import Product from '../models/product.js';


export const addCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, color, size, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const user = await User.findById(userId);
    const existingItem = user.cartItems.find(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (existingItem) existingItem.quantity += quantity || 1;
    else user.cartItems.push({ productId, color, size, quantity: quantity || 1 });
    
    await user.save();

    res.status(200).json({ message: 'Added to cart successfully', user: user });
  } catch (err) {
    console.error('Error adding cart item:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItemId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { cartItems: { _id: cartItemId } } },
      { new: true }
    ).populate('cartItems.productId');

    res.status(200).json({ message: 'Removed from cart', user: user});
  } catch (err) {
    console.error('Error removing cart item:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).
      populate('cartItems.productId').
      populate('wishListItems.productId');
    res.status(200).json(user.cartItems);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
