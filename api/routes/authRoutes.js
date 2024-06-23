import express from 'express';
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword } from '../controllers/authController.js';
 const authRouter = express.Router();

 authRouter.route('/register').post(registerUser);
 authRouter.route('/login').post(loginUser);
 authRouter.route('/logout').get(logoutUser);
 authRouter.route('/password/forgot').post(forgotPassword);
 authRouter.route('/password/reset/:token').post(resetPassword);
 

 export default  authRouter; 