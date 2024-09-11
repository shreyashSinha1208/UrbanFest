// routes/productRoutes.js
import express from 'express';
import { getProducts, getProductById, getProductsByCategory, searchProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/show/:productId', getProductById);
router.get('/products/:category', getProductsByCategory);
router.post('/search', searchProducts);

export default router;
