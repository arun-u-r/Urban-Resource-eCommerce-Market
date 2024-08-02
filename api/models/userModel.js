import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an Email"],
    validate: [validator.isEmail, "Please provide a valid Email address.."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [4, "Your password should be at least 4 characters long"],
    maxlength: [8, "Your password cannot exceed 8 characters"],
    select: false,
  },
  avatar: {
    type: String,
    required: [true, "Please provide an Avatar"],
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//Genarate jwt Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//Compare entered password with hashed password
userSchema.methods.isValidPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

//Get Password reset token
userSchema.methods.getResetToken = function () {
  //generate token
  const token = crypto.randomBytes(20).toString("hex");

  //genarate Hash and set resetToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  //set token expires time
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; //30 min

  return token;
};

let model = mongoose.model("User", userSchema);
export default model;
