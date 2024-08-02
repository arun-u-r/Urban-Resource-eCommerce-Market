import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";

//  Get Products - /api/v1/products ------> Get request
export const getProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 2;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resultPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// Create Product - /api/v1/product/new -----> POST request
export const newProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get a single Product - /api/v1/product/:id  ------> Get request
export const getSingleProduct = catchAsyncError(async (req, res, next) => {
  // try {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("The product not found", 400));
  }
  res.status(200).json({
    success: true,
    product,
  });
  // } catch (error) {
  // console.log(error.message)
  // return next(new ErrorHandler('No valid entry found for the provided ID', 400))
  // }
});

// Update Product-  /api/v1/product/:id  --------> PUT Request
export const updateProduct = async (req, res, next) => {
  try {
    // Get the existing product from the database
    let product = await Product.findById(req.params.id);
    // If no such product is found in
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, //to run the validators
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Internal server error ${error.message}`,
    });
  }
};

// Delete Product- /api/v1/product/:id   --------> Delete request
export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  try {
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.deleteOne({ _id: req.params.id }); //delete the product

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Internal  Server Error! ${error.message}`,
    });
  }
};

// Create review  - api/v1/review ---------> PUT Request
export const createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;
  const review = {
    user: req.user.id,
    rating,
    comment,
  };

  const product = await Product.findById(productId);

  //finding user review exists
  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    //updating the review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    //creating the review
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }

  //find average of the product reviews
  product.ratings =
    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
    product.reviews.length;
  //no values then retun NAN
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review created successfully",
  });
});

// Get reviews api/v1/reviews?id={productId} ---------> GET Request
export const getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Reviews
export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

// Filtering the reviews which match the deleting review Id   
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

// Updating number of reviews
  const numofReviews = reviews.length;

// Finding the average with filtered reviews  
  let ratings = product.reviews.reduce((acc, rev) => rev.rating + acc, 0) / product.reviews.length;
  //no values then retun NAN
  ratings = isNaN(ratings) ? 0 : ratings;

//Save the product document  
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numofReviews,
    ratings
  })

  res.status(200).json({
    success:true,
    message: "Review deleted successfully",
  })

});
