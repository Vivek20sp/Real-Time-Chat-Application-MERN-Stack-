import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  profilepic: {
    type: String,
    require: true,
  },
},{timestamps:true});

const UserModel = mongoose.model("User", User);

UserModel.createIndexes(); // Create indexes for search functionality

export default UserModel;
