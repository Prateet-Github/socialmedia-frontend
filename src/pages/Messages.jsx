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
      <div className="hidden md:block md:w-20 lg:w-22 shrink-0 border-r border-gray-200/60 dark:border-gray-800/60">
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
      <div className="hidden md:block flex-1 min-w-0">
        {selectedChat ? (
          <ChatBox chat={selectedChat} />
        ) : (
          <div className="text-center flex flex-col items-center justify-center h-full px-4">
            <svg
              className="w-20 h-20 mx-auto mb-4 text-gray-300 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Your Messages
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Messages;
