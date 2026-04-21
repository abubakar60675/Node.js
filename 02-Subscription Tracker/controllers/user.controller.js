import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
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

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.name = name;
    user.email = email;

    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: userObj,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    if (!oldPassword || !newPassword) {
      const error = new Error("Please provide old and new password");
      error.statusCode = 400;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid old password");
      error.statusCode = 401;
      throw error;
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
