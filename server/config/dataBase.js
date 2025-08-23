// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("DB CONNECTION FAILED");
    console.error(error.message);
    process.exit(1);
  }
};