import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referring to the "User" model
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referring to the "User" model
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // This will add createdAt and updatedAt timestamps
);

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
