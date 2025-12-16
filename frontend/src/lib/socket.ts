import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket?.id);
      socket?.emit("register", userId);
    });
  }

  return socket;
};

export const getSocket = () => socket;
