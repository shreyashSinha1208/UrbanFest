import {createOrder, getOrders, updateOrderStatus} from "../controllers/paymentController.js";
import express from "express";
import checkToken from '../middleware.js';
const router = express.Router();


router.post('/payment', checkToken, createOrder);

router.post('/payment/success/:orderId', checkToken, updateOrderStatus);

router.get('/orders' , checkToken, getOrders);
      
export default router;