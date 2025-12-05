import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import axios from "axios";
import { useSelector } from "react-redux";

const API = "http://localhost:5001/api";

export default function ChatBoxMobile() {
  const { chatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((s) => s.auth);

  const [chat, setChat] = useState(location.state?.chat || null);
  const [loading, setLoading] = useState(!location.state?.chat);

  useEffect(() => {
    // chat already passed → no need to fetch
    if (location.state?.chat) return;

    const fetchChat = async () => {
      try {
        const res = await axios.get(`${API}/chats/${chatId}`, {
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
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading chat…
      </div>
    );

  return <ChatBox chat={chat} />;
}