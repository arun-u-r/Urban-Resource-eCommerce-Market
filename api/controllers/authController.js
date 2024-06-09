import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from '../models/userModel.js'
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwt.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password, avatar} = req.body;
    const user = await User.create({
        name, 
        email,  
        password,  
        avatar
    });

    sendToken(user, 201, res)

})

export const loginUser = catchAsyncError(async (req, res , next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next( new ErrorHandler('Please enter email and password', 400))
    }
    // Checking if the user exists in the database
    const user = await User.findOne({ email }).select("+password");

    if (!user){
        return next(new ErrorHandler(`Oops! Looks like there's a hiccup with your credentials. Double-check and try again.`, 401))
    }
    const isPasswordMatched = await user.isValidPassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler(`Oops! Looks like there's a hiccup with your credentials. Double-check and try again.`, 401));
    }
    sendToken(user, 201, res)

})