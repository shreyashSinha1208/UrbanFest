import { subscriptionsSupport } from "../controllers/subscriptionController.js"
import express from 'express';

const router = express.Router();

router.post('/subscription', subscriptionsSupport);

export default router;