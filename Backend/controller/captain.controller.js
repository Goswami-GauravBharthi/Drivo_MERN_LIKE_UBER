import { validationResult } from "express-validator";
import Captain from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import BlacklistToken from "../models/balcklistToken.model.js";

export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  const isExisting = await Captain.findOne({ email });
  if (isExisting) {
    return res.status(400).json({ error: "Captain already exists" });
  }

  const hashedPassword = await Captain.hashPassword(password);

  try {
    const captain = await createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateToken();

    return res.status(201).json({ captain, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = await captain.generateToken();
    res.cookie("token", token);
    return res.status(200).json({ captain, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logoutCaptain = async (req, res) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  try {
    await BlacklistToken.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCaptainProfile = async (req, res) => {
  return res.status(200).json({ captain: req.captain });
};
