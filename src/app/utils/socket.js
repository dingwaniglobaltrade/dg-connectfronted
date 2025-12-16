import { io } from "socket.io-client";

let socket = null;

export function initSocket(token) {
  if (!socket) {
    socket = io( "https://dingwanifoods-backned-code.onrender.com/api/v1", {
      auth: { token },
      transports: ["websocket", "polling"], // fallback included
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
    });
  }
  return socket;
}

export function getSocket() {
  return socket;
}
