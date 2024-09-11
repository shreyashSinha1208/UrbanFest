import express from 'express';
import { createReview, deleteReview } from '../controllers/reviewController.js'
import checkUserSession from '../middleware.js';

const router = express.Router();

router.post('/createReview', checkUserSession, createReview);
router.delete('/deleteReview', checkUserSession, deleteReview);

export default router;
