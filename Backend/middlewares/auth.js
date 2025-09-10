import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import BlacklistToken from "../models/balcklistToken.model.js";
import Captain from "../models/captain.model.js";

//this middleware checks if the user is authenticated
export const authUser = async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  const isBlacklisted = await BlacklistToken.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

  

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authCaptain = async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  const isBlacklisted = await BlacklistToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded.id);
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
