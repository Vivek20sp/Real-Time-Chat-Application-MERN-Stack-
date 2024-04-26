import express from "express";
import findToken from "../MiddleWare/findToken.js";
import UserModel from "../models/UsersSchema.js";
import ConversationModel from "../models/ConversationModel.js";
import MessageModel from "../models/MessageModal.js";
import { realTimeMessage } from "../Socket/socket.js";
import { io } from "../Socket/socket.js";

const router = express.Router();

router.get("/getMessages/:id", findToken, async (req, res) => {
  try {
    const userId = req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).send({ error: "Authentication failed" });
    }

    const { id: ReceiverId } = req.params;
    const { _id: SenderId } = user;

    const conversation = await ConversationModel.findOne({
      participants:{$all:[SenderId,ReceiverId]},
    }).populate("messages");

    if (!conversation) {
      return res.status(404).send({ error: "Conversation not found" });
    }

    res.send({ messages: conversation.messages });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/sendMessage/:id", findToken, async (req, res) => {
  try {
    const userId = req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const { id: ReceiverId } = req.params;
    const { _id: SenderId } = user;

    let conversation = await ConversationModel.findOne({
      participants:{$all:[SenderId,ReceiverId]},
    }).populate("messages");

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants:[SenderId,ReceiverId],
      });
    }

    const message = new MessageModel({
      senderId: SenderId,
      receiverId: ReceiverId,
      message: req.body.message,
    });

    conversation.messages.push(message);
    await conversation.save();
    await message.save();

    const sendMessage = realTimeMessage(ReceiverId);
    if(sendMessage!==undefined){
      io.to(sendMessage).emit('messagesSend',message);
    }

    res.status(200).send({ message });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
