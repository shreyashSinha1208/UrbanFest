// routes/wishlistRoutes.js
import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlistController.js';
import checkToken from '../middleware.js';

const router = express.Router();

router.post('/wishlist', checkToken, addToWishlist);
router.delete('/wishlist/:id', checkToken, removeFromWishlist);
router.get('/wishlist', checkToken, getWishlist);

export default router;
