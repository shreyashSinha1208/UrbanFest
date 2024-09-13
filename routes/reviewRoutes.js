import express from 'express';
import { createReview, deleteReview } from '../controllers/reviewController.js'
import checkToken from '../middleware.js';

const router = express.Router();

router.post('/createReview', checkToken, createReview);
router.delete('/deleteReview', checkToken, deleteReview);

export default router;
