import mongoose from "mongoose";
import configKeys from "../../../config";

const connectDB = async () => {
  try {
    const dbOptions = {
      dbName: configKeys.DB_NAME, 
    };
    await mongoose.connect(configKeys.MONGO_DB_URL, dbOptions);

    console.log("Database connected...");
  } catch (error) {
    console.error("Database connection error", error);
    // Exiting the process or handle the error later
    process.exit(1);
  }
};

export default connectDB;
 