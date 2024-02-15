import express from "express";
const authRouter = express.Router();
import jwtAuth from "../middleware/jwtAuth.js";

import {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  getUser,
  logout
} from "../controller/authController.js";

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/forgotpassword", forgotPassword);
authRouter.post("/resetpassword/:token", resetPassword);

authRouter.get("/user", jwtAuth, getUser);
authRouter.get("/logout", jwtAuth, logout);

export default authRouter;
