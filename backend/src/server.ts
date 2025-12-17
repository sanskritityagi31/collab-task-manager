import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true
  }
});

io.on("connection", () => {});

export const getIO = () => io;

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
