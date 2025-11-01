import User from '../models/user.js';
import Product from '../models/product.js';


export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const user = await User.findById(userId);

        if (user.wishListItems.includes(productId)) return res.status(400).json({ message: 'Product already in wishlist' });

        user.wishListItems.push(productId);
        await user.save();

        const updatedUser = await User.findById(userId).populate('wishListItems');
        res.status(200).json({ message: 'Added to wishlist', user: updatedUser });
    } catch (err) {
        console.error('Error adding to wishlist:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};



export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { wishListItems: productId } },
            { new: true }
        ).populate('wishListItems');

        res.status(200).json({ message: 'Removed from wishlist', user: user });
    } catch (err) {
        console.error('Error removing from wishlist:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('wishListItems');
        res.status(200).json(user.wishListItems);
    } catch (err) {
        console.error('Error fetching wishlist:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
