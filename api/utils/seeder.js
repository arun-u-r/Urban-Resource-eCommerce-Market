import products from "../data/products.json" assert { type: "json" };
import Product from "../models/productModel.js";
import  dotenv from 'dotenv';
import connectDatabase from '../config/database.js' 

dotenv.config({ path: "config/config.env" });
connectDatabase()

const seedProdects = async () => {
  try {
    await Product.deleteMany();
    console.log("Deleting all products...");
    await Product.insertMany(products);
    console.log("All products added");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};


seedProdects();