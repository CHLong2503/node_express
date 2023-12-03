import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { signUpValidator, signInValidator } from "../validations/user.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async (req, res) => {
  try {
    // Step 1: Validate data user
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Step 2: Check the existed email
    const existedEmail = await User.findOne({ email: req.body.email });
    if (existedEmail) {
      return res.status(400).json({
        message: "This email is already registered",
      });
    }

    // Step 3: Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Step 4: Initialize user into DB
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Step 5: Notice to user when succeed
    user.password = undefined; // Hide password
    return res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    // Step 1: Validate data user
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Step 2: Check data email is existed or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials, do you want to sign up",
      });
    }

    // Step 3: Compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    // Step 4: Create JWT
    const accessToken = jwt.sign({ _id: user._id }, JWT_SECRET);
    console.log(accessToken);
    // Step 5: Notice to user when succeed
    user.password = undefined;
    return res.status(200).json({
      message: "User signed in successfully",
      user,
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
