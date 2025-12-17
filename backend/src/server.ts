import http from "http";
import app from "./app";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  if (process.env.NODE_ENV !== "test") {
    console.log("🟢 Socket connected:", socket.id);
  }

  socket.on("disconnect", () => {
    if (process.env.NODE_ENV !== "test") {
      console.log("🔴 Socket disconnected:", socket.id);
    }
  });
});

// ✅ DO NOT start server during tests
if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export { io };
