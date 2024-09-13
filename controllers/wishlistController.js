// controllers/wishlistController.js
import WishList from '../models/wishlist.js';
import User from '../models/user.js';

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlistItem = new WishList(req.body);
        await wishlistItem.save();

        await User.findByIdAndUpdate(userId, {
            $push: { wishListItems: wishlistItem._id }
        }, { new: true });

        res.status(200).json(wishlistItem);
    } catch (error) {
        res.status(500).json({ error: 'Error adding item to wishlist' });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        await WishList.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(userId, {
            $pull: { wishListItems: req.params.id }
        }, { new: true });

        const wishListItems = await WishList.find({});
        res.send(wishListItems);
    } catch (error) {
        res.status(500).json({ error: 'Error removing item from wishlist' });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('wishListItems');
        res.send(user.wishListItems);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching wishlist' });
    }
};
