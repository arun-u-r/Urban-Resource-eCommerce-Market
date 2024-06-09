import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name]"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an Email"],
    validate: [validator.isEmail, "Please provide a valid Email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [4, "Your password should be at least 4 characters long"],
    maxlength: [8, "Your password cannot exceed 8 characters"],
    select: false
  },
  avatar: {
    type: String,
    required: [true, "Please provide an Avatar"],
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordTocken: String,
  resetPasswordTockenExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.isValidPassword = async function(enterdPassword) {
   return await bcrypt.compare(enterdPassword, this.password,)

}

let model = mongoose.model("User", userSchema);

export default model;
