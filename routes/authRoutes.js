// routes/userRoutes.js
import express from 'express';
import { loginUser, logoutUser, checkUser, updateUserProfile, getCurrentUser } from '../controllers/userController.js';
import { upload } from '../cloudinary.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/check', checkUser);
router.get('/user', getCurrentUser);
router.put('/update/:id', upload.single('profileImage'), updateUserProfile);

export default router;
