import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishListRoutes from './routes/wishListRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import bodyParser from 'body-parser';

const app = express();


const db_url = process.env.ATLASDB_URL;

// Session configuration
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: db_url,
    touchAfter: 24 * 60 * 60,
   }),
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
  httpOnly: true,
}));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(db_url)
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
