// routes/cartRoutes.js
import express from 'express';
import { addCartItem, deleteCartItem, getCartItems } from '../controllers/cartController.js';
import checkToken from '../middleware.js';

const router = express.Router();

router.post('/cart', checkToken, addCartItem);
router.delete('/cart/:cartItemId', checkToken, deleteCartItem);
router.get('/cart', checkToken, getCartItems);

export default router;

