import mongoose from "mongoose";

const connectToMongoose = async () => {
  const ConnectionString =
    "mongodb+srv://vivekphadake17:Vivek%402019@realtimechatapplication.fclrcaq.mongodb.net/Real-Time-Chat-Application";
  try {
    await mongoose.connect(ConnectionString);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log("Failed to Connect to Database");
  }
};

export default connectToMongoose;
