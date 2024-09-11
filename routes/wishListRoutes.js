// routes/wishlistRoutes.js
import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlistController.js';
import checkUserSession from '../middleware.js';

const router = express.Router();

router.post('/wishlist', checkUserSession, addToWishlist);
router.delete('/wishlist/:id', checkUserSession, removeFromWishlist);
router.get('/wishlist', checkUserSession, getWishlist);

export default router;
