import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("Please define DB_URI in .env file");
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to Database in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error Occured while connecting to Database", error);
    process.exit(1);
  }
};
