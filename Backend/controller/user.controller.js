import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import BlacklistToken from "../models/balcklistToken.model.js";

export const registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullName, email, password } = req.body;

  const isExisting = await User.findOne({ email });
  if (isExisting) {
    return res.status(400).json({ error: "User already exists" });
  }

  const user = await createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password,
  });

  const token = user.generateAuthToken(); //call this method from model instance

  res.status(201).json({ user, token });
};

export const loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token);

    return res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

export const logoutUser = async (req, res) => {
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  try {
    await BlacklistToken.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};