import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export const useSocketNotifications = (onUpdate: () => void) => {
  useEffect(() => {
    socket.on("task:created", onUpdate);
    socket.on("task:updated", onUpdate);

    socket.on("task:assigned", (data) => {
      alert(`📌 New task assigned: ${data.task.title}`);
      onUpdate();
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:assigned");
    };
  }, [onUpdate]);
};
