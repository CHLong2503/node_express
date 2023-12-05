import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

const { JWT_SECRET } = process.env;

export const checkPermission = async (req, res, next) => {
  try {
    // Step 1: Did user sign in?
    const token = req.headers.authorization?.split(" ")[1];

    // Step 2: Check token
    if (!token) {
      return res.status(403).json({
        message: "You are not logged in",
      });
    }
    // Step 3: Check role of user
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "You don't have permisson to do this !!!",
      });
    }

    // Step 4: Next
    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
