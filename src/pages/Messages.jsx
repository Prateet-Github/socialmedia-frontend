import { useState } from "react";
import Left from "../components/Left";
import ChatBox from "../components/ChatBox";
import Dm from "../components/Dm";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  // When selecting a chat
  const handleSelectChat = (chat) => {
    if (window.innerWidth < 768) {
      // 📱 MOBILE → redirect to full chat page
      navigate(`/messages/${chat._id}`);
    } else {
      // 💻 DESKTOP → show chat on the right side
      setSelectedChat(chat);
    }
  };

  return (
    <main className="flex min-h-screen w-full mx-auto pt-16 lg:pt-0">
      {/* Left Sidebar (desktop) */}
      <div className="hidden md:block md:w-20 lg:w-22 shrink-0 border-r border-gray-200 dark:border-gray-800">
        <Left showLabels={false} />
      </div>

      {/* Left Sidebar (mobile) */}
      <div className="md:hidden">
        <Left showLabels={true} />
      </div>

      {/* Chats List */}
      <div className="w-full md:w-80 lg:w-96 shrink-0 border-r border-gray-200 dark:border-gray-800">
        <Dm onSelectChat={handleSelectChat} />
      </div>

      {/* Chat Box (only desktop) */}
      <div className="hidden md:block flex-1 min-w-0 border-l border-gray-200 dark:border-gray-800">
        {selectedChat ? (
          <ChatBox chat={selectedChat} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a chat to begin messaging
          </div>
        )}
      </div>
    </main>
  );
};

export default Messages;