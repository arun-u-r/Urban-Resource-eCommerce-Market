import express from "express";
import {
  createReview,
  deleteProduct,
  deleteReview,
  getProducts,
  getReviews,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import {authorizeRoles, isAuthenticateUser} from '../middlewares/authenticate.js';

const productRouter = express.Router();

productRouter.route("/products").get(isAuthenticateUser, getProducts);
productRouter.route("/product/:id").get(getSingleProduct)
                                    .put(updateProduct)
                                    .delete(deleteProduct);
productRouter.route('/review').put(isAuthenticateUser, createReview)
                              .delete(deleteReview)
productRouter.route('/reviews').get(getReviews)


//Admin routes 
productRouter.route("/admin/product/new").post(isAuthenticateUser, authorizeRoles("admin"),  newProduct);


export default productRouter;