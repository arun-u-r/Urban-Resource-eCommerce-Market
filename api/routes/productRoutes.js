import express from "express";
import {
  deleteProduct,
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import {authorizeUser, isAuthenticateUser} from '../middlewares/authenticate.js';

const productRouter = express.Router();

productRouter.route("/products").get(isAuthenticateUser, getProducts);
productRouter.route("/product/new").post(isAuthenticateUser, authorizeUser("admin"),  newProduct);
productRouter.route("/product/:id")
                                    .get(getSingleProduct)
                                    .put(updateProduct)
                                    .delete(deleteProduct);

// productRouter.route("/qrcode").post(QRcodeGenerator)                                     

export default productRouter;
