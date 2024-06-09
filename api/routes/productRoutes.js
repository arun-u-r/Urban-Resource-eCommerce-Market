import express from "express";
import {
  deleteProduct,
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";
// import QRcodeGenerator from "../test/QRcode.js";

const productRouter = express.Router();

productRouter.route("/products").get(getProducts);
productRouter.route("/product/new").post(newProduct);
productRouter.route("/product/:id")
                                    .get(getSingleProduct)
                                    .put(updateProduct)
                                    .delete(deleteProduct);

// productRouter.route("/qrcode").post(QRcodeGenerator)                                    

export default productRouter;
