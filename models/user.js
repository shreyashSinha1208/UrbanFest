// user.js

import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
          username: {
                    type: String,
                    required: true
          },
          email: {
                    type: String,
                    required: true,
                    unique: true, // Ensures that each email is unique in the database
          },
          password: {
                    type: String,
                    required: false
          },
          googlesubId: {
                    type: String,
                    required: false
          },
          cartItems: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'CartItem' // Reference to the CartItem schema
          }],
          wishListItems: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'WishList' // Reference to the CartItem schema
          }],
          picture: {
                    type: String,
                    required: false
          }
});

const User = mongoose.model('User', userSchema);

export default User;
