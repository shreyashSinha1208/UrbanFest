// routes/userRoutes.js
import express from 'express';
import { loginUser, logoutUser, checkUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/check', checkUser);

export default router;
