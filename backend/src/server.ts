import http from "http";
import app from "./app";
import { initSocket } from "./sockets";

const server = http.createServer(app);

initSocket(server);

server.listen(5000, () => {
  console.log("🚀 Server + Socket.IO running on port 5000");
});
