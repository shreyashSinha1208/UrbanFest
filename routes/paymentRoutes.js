import {createOrder, getOrders, updateOrderStatus} from "../controllers/paymentController.js";
import express from "express";
import checkUserSession from '../middleware.js';
const router = express.Router();


router.post('/payment', checkUserSession, createOrder);

router.post('/payment/success/:orderId', checkUserSession, updateOrderStatus);

router.get('/orders' , checkUserSession, getOrders);
      
export default router;