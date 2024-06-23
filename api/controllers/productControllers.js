import Product from "../models/productModel.js";
import ErrorHandler from '../utils/errorHandler.js';
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";

//  Get Products - /api/v1/products ------> Get request
export const getProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 2 ;
  const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resultPerPage)

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});


// Create Product - /api/v1/product/new -----> POST request
export const newProduct = catchAsyncError( async (req, res, next) => {

  req.body.user =req.user.id

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
    
  });
}); 


// Get a single Product - /api/v1/product/:id  ------> Get request
export const getSingleProduct = catchAsyncError (async (req, res, next) => {
  // try {
    const product = await Product.findById(req.params.id)
    if(!product){
      return next(new ErrorHandler('The product not found', 400))
    }
    res.status(200).json({
     success: true,
     product
    })
  // } catch (error) { 
    // console.log(error.message)
    // return next(new ErrorHandler('No valid entry found for the provided ID', 400))
  // }
}); 


// Update Product-  /api/v1/product/:id  --------> PUT Request
export const updateProduct = async (req, res, next) => {
   try {
     // Get the existing product from the database
     let product = await Product.findById(req.params.id)
     // If no such product is found in
     if(!product){
         return res.status(404).json({
             success:false,
             message: "Product not found"
         })
        }
         product = await Product.findByIdAndUpdate(req.params.id , req.body,{
             new :true,
             runValidators:true, //to run the validators
         })
         res.status(200).json({
             success:true,
             product
         })
     
   } catch (error) {
    console.log(error.message)
    res.status(500).json({
        success: false,
        message: `Internal server error ${error.message}`
    })
    
   }
};

  
// Delete Product- /api/v1/product/:id   --------> Delete request
export const deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)
   try {
     if(!product){
         return res.status(404).json({
             success:false,
             message: "Product not found"
         })
        }

         await Product.deleteOne({_id:req.params.id})  //delete the product

         res.status(200).json({
             success:true,
             message: 'Producct Deleted Successfully',
         })
     
   } catch (error) {
    console.log(error.message)
    res.status(500).json({
        success: false,
        message: `Internal  Server Error! ${error.message}`
    })
    
   }
};
  