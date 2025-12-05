import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chats from "./Chats";

const API_URL = "http://localhost:5001/api/chats";

const Dm = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // ✅ needed for mobile redirect

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChats(res.data);
      } catch (err) {
        console.log("Failed to load chats:", err);
      }
    };

    fetchChats();
  }, [token]);

  // ✅ Correctly handle mobile vs desktop
  const handleSelectChat = (chat) => {
    if (window.innerWidth < 768) {
      // mobile → go to `/messages/:id`
      navigate(`/messages/${chat._id}`, { state: { chat } }); // pass full chat
    } else {
      // desktop → show chat in right panel
      onSelectChat(chat);
    }
  };

  return (
    <main className="overflow-y-auto h-screen scroll-hide">
      <div className="sticky top-0 bg-white dark:bg-black">
        <h1 className="text-2xl font-semibold px-4 pt-2">Messages</h1>
        <div className="flex relative py-4 px-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 pl-10 bg-gray-50 dark:bg-gray-900 border border-gray-700 outline-none w-full rounded-full focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Render user chats */}
      {chats.map((chat) => (
        <Chats
          key={chat._id}
          chat={chat}
          onClick={() => handleSelectChat(chat)} // ✅ FIXED
        />
      ))}
    </main>
  );
};

export default Dm;