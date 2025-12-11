import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false, // we control when to connect
});

// helper to connect with optional token
export const connectSocket = (opts = {}) => {
  if (!socket.connected) {
    socket.auth = opts.auth || {};
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};