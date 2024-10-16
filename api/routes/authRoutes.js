import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "..", "uploads/user"));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only images (jpg, jpeg, png) are allowed"));
      }
      cb(null, true);
    },
  }),
});

import {
  changePassword,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateProfile,
  updateUser,
} from "../controllers/authController.js";
import {
  authorizeRoles,
  isAuthenticateUser,
} from "../middlewares/authenticate.js";
const authRouter = express.Router();

authRouter.route("/register").post(upload.single("avatar"), registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").get(logoutUser);
authRouter.route("/password/forgot").post(forgotPassword);
authRouter.route("/password/reset/:token").post(resetPassword);
authRouter.route("/myprofile").get(isAuthenticateUser, getUserProfile);
authRouter.route("/password/change").put(isAuthenticateUser, changePassword);
authRouter.route("/updateuser").put(isAuthenticateUser, upload.single("avatar"), updateProfile);

//admin routes
authRouter
  .route("/admin/users")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllUsers);
authRouter
  .route("/admin/user/:id")
  .get(isAuthenticateUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticateUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteUser);

export default authRouter;
