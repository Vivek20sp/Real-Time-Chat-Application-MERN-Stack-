import path from "path";
import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import connectToMongoose from "./db.js";
import bodyParser from "body-parser"; // Import body-parser
import cors from "cors";
import { app, server } from "./Socket/socket.js";

app.use(bodyParser.json()); // Add body parsing middleware for JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add body parsing middleware for URL-encoded bodies
app.use(cors()); // Enable CORS for all

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use("/api/auth", authRoute);
app.use("/api/messageRoute", messageRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoose();
  console.log(`Your Server Running at Port http://localhost:${PORT}/`);
});
