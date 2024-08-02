import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

//Create new Order - api/v1/order/new
export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItem,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItem,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get single Order - api/v1/order/:id
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with in this Id:${req.params.id} `)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//myOrder / logged user's all orders - api/v1/myorder
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({
    count: orders.length,
    success: true,
    orders,
  });
});

//Admin : Get all orders and net amount - api/v1/orders
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  const totalOrder = orders.length;
  console.log(totalOrder);
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalOrder,
    totalAmount,
    orders,
  });
});

//Admin : Update Order / order status -  api/v1/v1/order/:id
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("Order has been Already deliverd"));
  }
  //Update the Product stock of each item
  order.orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.product, orderItem.quantity);
  });

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({
    success: true,
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//Admin : Delete Order - api/v1/order/:id
export const deleteOder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not fonud", 400));
  }
  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});
