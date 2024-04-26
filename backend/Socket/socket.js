import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

let usersInRoom = {}; // keep track of all the users in chat room

// when a user connects to our socket server - listen for 'connection' event

export const realTimeMessage = (userId) => {
  return usersInRoom[userId];
};

io.on("connection", (socket) => {
  console.log("A user is Connected ", socket.id);

  const user = socket.handshake.query.userId;
  if (user !== "undefined") {
    usersInRoom[user] = socket.id;
  }

  io.emit("getOnlineUser", Object.keys(usersInRoom));

  socket.on("disconnect", () => {
    console.log("A user Dissconnected", socket.id);
    delete usersInRoom[user];
    io.emit("getOnlineUser", Object.keys(usersInRoom));
  });
});

export { app, io, server };
