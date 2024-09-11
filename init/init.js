//Initialsing our database and adding our data.


import mongoose from "mongoose";
import initData from "./data.js";
import Product from "../models/product.js";
import CartItem from "../models/cartItem.js";
import User from "../models/user.js";
import WishList from "../models/wishlist.js";


//creating a separate database for e-commerce server
const MONGO_URL = "mongodb://127.0.0.1:27017/UrbanNest";


//connecting to MongoDB server
main().then(() => {
          console.log("connected to DB");
}).catch((err) => {
          console.log(err);
});

async function main() {
          await mongoose.connect(MONGO_URL);
}


//Inserting the data into the Collection Items from the data.js
const initDB = async () => {
          await Product.deleteMany({});
          await CartItem.deleteMany({});
          await User.deleteMany({});
          //console.log(initData);
          await Product.insertMany(initData);
          console.log("data was initialized");
}

//calling above function during program execution
initDB();