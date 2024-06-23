import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/email.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwt.js";
import crypto from'crypto';

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  sendToken(user, 201, res);
});


export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  // Checking if the user exists in the database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler(
        `Oops! Looks like there's a hiccup with your credentials. Double-check and try again.`,
        401
      )
    );
  }
  const isPasswordMatched = await user.isValidPassword(password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler(
        `Oops! Looks like there's a hiccup with your credentials. Double-check and try again.`,
        401
      )
    );
  }
  sendToken(user, 201, res);
});


//logout
export const logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      sucess: true,
      message: "Logged out",
    });
};


// forgot password
export const forgotPassword = catchAsyncError(async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not double check your email", 404));
  }
  const resetToken = user.getResetToken();
  await    user.save({ validateBeforeSave: false });

  //create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Hi ${user.name},\n\n
We received a request to reset your password for your account at UrbanResource. Please use the link below to set a new password. For security reasons, this link will expire in 30 min.\n\n
${resetUrl}\n\n
If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.\n\n

Thank you for being a valued user!\n

Best regards,\n
UrbanResorce Team`;

  try {
    sendEmail({
      email: user.email,
      subject: "urban resource password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `message sent to ${user.email}`,
    });
     
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message), 500);
  }
});


//reset password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  // Find the user by the reset token and ensure the token hasn't expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire:{
      $gt : Date.now()
    }
  })
 
  // Check if the user exists and the token is valid
  if(!user) {
    return next(new ErrorHandler('Invalid token or token has expired'));
  }
 
 // check if the passwords match
  if(req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler('Password does not match'));

 // Update the user's password and clear the reset token fields
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
   
  // Save the user, skipping validation before save
  await user.save({validateBeforeSave:false})
  
  // Send a new token to the user
  sendToken(user, 201, res)

})