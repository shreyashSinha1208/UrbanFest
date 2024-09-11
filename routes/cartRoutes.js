// routes/cartRoutes.js
import express from 'express';
import { addCartItem, deleteCartItem, getCartItems } from '../controllers/cartController.js';
import checkUserSession from '../middleware.js';

const router = express.Router();

router.post('/cart', checkUserSession, addCartItem);
router.delete('/cart/:id', checkUserSession, deleteCartItem);
router.get('/cart', checkUserSession, getCartItems);

export default router;

