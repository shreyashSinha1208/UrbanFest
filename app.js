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

const app = express();

const db_url = process.env.ATLASDB_URL;

// Session configuration
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: db_url,
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-origin in production
    domain: 'urbanfest.netlify.app', // Ensure the domain is correct
  },
}));

// CORS configuration
app.use(cors({
  origin: 'https://urbanfest.netlify.app', // Correct frontend URL
  credentials: true,
}));

app.use(express.json()); // Built-in JSON parser

// Connect to MongoDB
mongoose.connect(db_url, { tls: true })
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

app.get('/session-data' , async(req,res) => {
  res.json({sessiondata: req.session, sessionId: req.sessionID});
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
}); 
