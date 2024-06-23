import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticateUser = catchAsyncError(async (req, res, next) => {
  console.log("Checking authentication...");
  const { token } = req.cookies;

  if (!token) {
    console.log("No token found");
    return next(new ErrorHandler("Please Login to access the resource", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      console.log("User not found");
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    console.log("Token verification failed");
    return next(new ErrorHandler("Invalid token", 401));
  }
});

export const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Unautorized Role ${req.user.role}`, 401));
    }
    next();
  };
};
