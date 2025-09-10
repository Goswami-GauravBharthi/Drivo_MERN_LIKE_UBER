import express from "express";
import { body } from "express-validator";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import {authUser} from "../middlewares/auth.js"
const userRoute = express.Router();

userRoute.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

userRoute.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").exists().withMessage("Password is required"),
  ],
  loginUser
);
userRoute.get("/profile", authUser, getUserProfile);

userRoute.get("/logout", authUser, logoutUser);
export default userRoute;
