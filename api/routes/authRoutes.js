import express from "express";
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
import { authorizeRoles, isAuthenticateUser } from "../middlewares/authenticate.js";
const authRouter = express.Router();


authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").get(logoutUser);
authRouter.route("/password/forgot").post(forgotPassword);
authRouter.route("/password/reset/:token").post(resetPassword);
authRouter.route("/myprofile").get(isAuthenticateUser, getUserProfile);
authRouter.route("/password/change").put(isAuthenticateUser, changePassword);
authRouter.route("/updateuser").put(isAuthenticateUser, updateProfile);

//admin routes
authRouter.route("/admin/users").get(isAuthenticateUser,authorizeRoles("admin"),getAllUsers);
authRouter.route("/admin/user/:id").get(isAuthenticateUser,authorizeRoles("admin"),getSingleUser)
                                    .put(isAuthenticateUser,authorizeRoles("admin"),updateUser)
                                    .delete(isAuthenticateUser,authorizeRoles("admin"),deleteUser);


export default authRouter;
