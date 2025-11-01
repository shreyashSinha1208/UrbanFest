import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from './generateToken.js';
import jwt from 'jsonwebtoken';



export const signupUser = async (req, res) => {
  const { sub, name, email, password, picture } = req.body;
  try {
    if (sub) {
      const existingUser = await User.findOne({ $or: [{ googlesubId: sub }, { email }] });

      if (existingUser) return res.status(400).json({ message: 'User already exists. Please login instead.' });

      const newUser = new User({ username: name, email, googlesubId: sub, picture });
      await newUser.save();

      const token = generateToken(newUser);
      return res.status(201).json({ message: 'User created successfully', user: newUser, token });
    }

    if (!name || !email || !password) return res.status(400).json({ message: 'Please provide username, email and password' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered. Please login instead.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser);
    return res.status(201).json({ message: 'User created successfully', user: newUser, token });

  } catch (error) {
    console.log('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup', error: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { sub, email, password, picture } = req.body;
  try {
    let user;
    if (sub) {
      user = await User.findOne({ googlesubId: sub }) || await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found. Please sign up first.' });

      if (!user.googlesubId) {
        user.googlesubId = sub;
        user.picture = picture;
        await user.save();
      }

    } else {
      if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

      user = await User.findOne({ email });

      if (!user) return res.status(404).json({ message: 'User not found. Please sign up first.' });
      if (!user.password) return res.status(400).json({ message: 'This account uses Google login. Please login with Google.' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.log('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};


export const logoutUser = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully. Please discard your token.'
  });
};


export const checkUser = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid or expired token'
      });
    }

    res.json({
      loggedIn: true,
      user: decoded,
      sessionActive: true
    });
  });
};


import { cloudinary } from '../cloudinary.js';

export const updateUserProfile = async (req, res) => {
  const userId = req.params.id;
  const { name, addresses, gender, contact, phoneVerified } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.username = name;
    if (gender) user.gender = gender;
    if (contact) user.contact = contact;
    if (phoneVerified !== undefined) user.phoneVerified = phoneVerified;

    if (addresses) {
      try {
        const addressArray = typeof addresses === 'string'
          ? JSON.parse(addresses)
          : addresses;
        if (Array.isArray(addressArray)) {
          user.addresses = addressArray;
        } else {
          console.log('Invalid addresses format, expected array');
        }
      } catch (error) {
        console.log('Error parsing addresses:', error);
      }
    }

    if (req.file) {
      if (user.picture && user.cloudinaryId) {
        try {
          console.log('Deleting old image:', user.cloudinaryId);
          await cloudinary.uploader.destroy(user.cloudinaryId);
          console.log('Old image deleted from Cloudinary');
        } catch (error) {
          console.log('Error deleting old image:', error);
        }
      }

      user.picture = req.file.path;
      user.cloudinaryId = req.file.filename;

      console.log('New image saved:', {
        picture: user.picture,
        cloudinaryId: user.cloudinaryId
      });
    }

    console.log('Saving user to database...');
    await user.save();
    console.log('User saved successfully!');

    const responseUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      picture: user.picture,
      addresses: user.addresses,
      gender: user.gender,
      contact: user.contact,
      phoneVerified: user.phoneVerified,
      hasSubscription: user.hasSubscription,
      cartItems: user.cartItems,
      wishList: user.wishListItems
    };

    console.log('Sending response:', responseUser);

    res.json({
      message: 'Profile updated successfully',
      user: responseUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      message: 'Server error during profile update',
      error: error.message,
      details: error.toString()
    });
  }
};



export const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log('Get current user error:', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    return res.status(500).json({ message: 'Server error retrieving user', error: error.message });
  }
};
