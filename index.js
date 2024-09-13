import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishListRoutes from './routes/wishListRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';

const app = express();

const db_url = process.env.ATLASDB_URL;

// CORS configuration
app.use(cors({
  origin: 'https://urbanfest.netlify.app',
  credentials: true,
}));

// Middleware for parsing JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Route configuration
app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(wishListRoutes);
app.use(paymentRoutes);
app.use(reviewRoutes);
app.use(subscriptionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
