import express from "express";
import {
  deleteOder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";
import {
  authorizeRoles,
  isAuthenticateUser,
} from "../middlewares/authenticate.js";

const orderRouter = express.Router();

orderRouter.route("/order/new").post(isAuthenticateUser, newOrder);
orderRouter.route("/order/:id").get(isAuthenticateUser, getSingleOrder);
orderRouter.route("/myorder").get(isAuthenticateUser, myOrders);

// Admin Routes
orderRouter.route("/orders").get(isAuthenticateUser, authorizeRoles("admin"), getAllOrders);
orderRouter.route("/order/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateOrder)
                               .delete(isAuthenticateUser, authorizeRoles("admin"), deleteOder);

export default orderRouter;
