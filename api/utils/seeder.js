import products from "../data/products.json" assert { type: "json" };
import Product from "../models/productModel.js";
import  dotenv from 'dotenv';
import connectDatabase from '../config/database.js' 
import { fileURLToPath } from "url";
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// absolute path
dotenv.config({path: path.join(__dirname, "../config/config.env")})
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