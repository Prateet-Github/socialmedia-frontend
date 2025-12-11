import { useEffect } from "react";
import { socket, connectSocket } from "../socket";

export default function useSocket({ userId, token } = {}) {
  useEffect(() => {
    if (!userId) return;

    // connect only once
    connectSocket({ auth: { token } });

    // tell backend who is online
    socket.emit("join", userId);

    const onConnect = () =>
      console.log("⚡ socket connected:", socket.id);

    const onDisconnect = () =>
      console.log("🔌 socket disconnected");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // do not disconnect socket here, as other hooks might be using it
    };
  }, [userId, token]);
}