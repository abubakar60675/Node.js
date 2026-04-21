import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: userObj,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid Email or Password");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Email or Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: userObj,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
