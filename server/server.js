/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import messagesRoutes from "./routes/messages.js";
dotenv.config();

const app = express();
const MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.smq9jap.mongodb.net/chat`;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", userRoutes);
app.use("/messages", messagesRoutes);
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is Connected");
  })
  .catch((err) => console.log(err.message));

// eslint-disable-next-line no-unused-vars
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("sendMsg", (data) => {
    // console.log(data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msgRecieve", data.message);
    }
  });
});
