import mongoose from "mongoose";

const connectToMongoose = async () => {
  const ConnectionString = process.env.MONGODB_CONNECTION_STRING;
  try {
    await mongoose.connect(ConnectionString);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log("Failed to Connect to Database");
  }
};

export default connectToMongoose;
