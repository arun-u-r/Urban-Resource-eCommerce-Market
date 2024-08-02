import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/email.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwt.js";
import crypto from "crypto";

//register - /api/v1/register
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

//login - /api/v1/login
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

//logut - /api/v1/logout
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

// forgot password- /api/v1/password/forgot
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not double check your email", 404));
  }
  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });

  //create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Hi ${user.name},\n\n
We received a request to reset your password for your account at UrbanResource.
Please use the link below to set a new password.
For security reasons, this link will expire in 30 min.
\n\n
${resetUrl}
\n\n
If you did not request a password reset, please ignore this email or
contact our support team if you have any concerns.\n\n
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

//reset password - /api/v1/password/reset/:token
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find the user by the reset token and ensure the token hasn't expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
      $gt: Date.now(),
    },
  });

  // Check if the user exists and the token is valid
  if (!user) {
    return next(new ErrorHandler("Invalid token or token has expired"));
  }

  // check if the passwords match
  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Password does not match"));

  // Update the user's password and clear the reset token fields
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;

  // Save the user, skipping validation before save
  await user.save({ validateBeforeSave: false });

  // Send a new token to the user
  sendToken(user, 201, res);
});

//Get user profile - /api/v1/myprofile
export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// change password - /api/v1/password/change
export const changePassword = catchAsyncError(async (req, res, next) => {
  // Ensure that req.user exists
  if (!req.user || !req.user.id) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  // Find the user by ID and select the password
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Check if old password matches
  const isMatch = await user.isValidPassword(req.body.oldPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  // Check if new password matches the confirmation password
  if (req.body.newPassword !== req.body.confirmNewPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  // Assign the new password
  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

//Update Profile - /api/v1/updateuser
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});


//======================Admin Section========================
// Admin: Get All user - /api/v1/admin/users
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});


//Admin: Get single User - /api/v1/admin/user/:id
export const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User not found with this ID ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});


//Admin: Update user - /api/v1/admin/user/:id
export const updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});



// Admin: Delete User - /api/v1/admin/user/:id
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    new ErrorHandler(`User not found with this ID ${req.params.id}`, 404)
  }

  await user.deleteOne({_id : req.params.id});

  res.status(200).json({
    success: true,
  })

});
