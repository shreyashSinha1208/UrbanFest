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
                    unique: true,
          },
          password: {
                    type: String,
                    required: false
          },
          googlesubId: {
                    type: String,
                    required: false
          },
          cartItems: [
                    {
                              productId: {
                                        type: mongoose.Schema.Types.ObjectId,
                                        ref: 'Product',
                                        required: true,
                              },
                              quantity: {
                                        type: Number,
                                        default: 1,
                              },
                              color: String,
                              size: String,
                              addedAt: {
                                        type: Date,
                                        default: Date.now,
                              },
                    },
          ],
          wishListItems: [
                    {
                              type: mongoose.Schema.Types.ObjectId,
                              ref: 'Product'
                    }
          ],

          picture: {
                    type: String,
                    required: false
          },
          addresses: [{
                    address: String,
                    label: String,
                    id: Number,
                    isDefault: Boolean
          }],
          gender: {
                    type: String,
                    required: false
          },
          contact: {
                    type: Number,
                    required: false
          },
          cloudinaryId: {
                    type: String,
                    required: false
          },
          hasSubscription: {
                    type: Boolean,
                    default: false
          }

});

const User = mongoose.model('User', userSchema);

export default User;
