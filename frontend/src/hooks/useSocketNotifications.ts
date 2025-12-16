import { useEffect } from "react";
import { connectSocket } from "../lib/socket";
import { toastSuccess } from "../lib/toast";

export const useSocketNotifications = (userId?: string) => {
  useEffect(() => {
    if (!userId) return;

    const socket = connectSocket(userId);

    socket.on("task:assigned", (data) => {
      toastSuccess(`📝 ${data.message}`);
    });

    return () => {
      socket.off("task:assigned");
    };
  }, [userId]);
};
