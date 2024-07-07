import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected to DB successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to DB", err);
    });
    await mongoose.connect(config.databaseUrl as string);
  } catch (err) {
    console.error("failed to connect to DB", err);
    process.exit(1);
  }
};

export default connectDB;
