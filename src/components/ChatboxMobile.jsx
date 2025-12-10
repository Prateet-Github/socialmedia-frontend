import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import { useSelector } from "react-redux";
import api from "../utils/api";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

export default function ChatBoxMobile() {
  const { chatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((s) => s.auth);

  // if chat object was passed via navigate (from Dm list)
  const [chat, setChat] = useState(location.state?.chat || null);
  const [loading, setLoading] = useState(!location.state?.chat);

  useEffect(() => {
    // if chat was passed already, no need to fetch
    if (location.state?.chat) return;

    const fetchChat = async () => {
      try {
        const res = await api.get(`/chats/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChat(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch chat:", err);
        navigate("/messages");
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [chatId, token, navigate, location.state?.chat]);

  if (loading || !chat) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading chat…
      </div>
    );
  }

  // ChatBox already contains all voice/video call popups + modals
  return <ChatBox chat={chat} />;
}