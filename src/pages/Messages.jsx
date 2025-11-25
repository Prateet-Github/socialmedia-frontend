import Left from "../components/Left";
import Chats from "../components/Chats";
import ChatBox from "../components/ChatBox";
import { Search } from "lucide-react";

const Messages = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      {/* Left Sidebar - Icons only */}
      <div className="hidden md:block w-22 shrink-0 border-r">
        <Left showLabels={false} />
      </div>

      {/* Chats List - Responsive width */}
      <div className="w-full md:w-80 lg:w-96 shrink-0 border-r">
        <div className="flex relative p-4 border-b">
          <Search className="text-gray-400 absolute left-7 top-1/2 -translate-y-1/2 size-5" />
          <input
            type="text"
            placeholder="Search"
            className="p-2 pl-10 border-2 border-gray-700 outline-none w-full rounded-full focus:border-blue-500 transition-colors"
          />
        </div>
        <Chats />
        <Chats />
      </div>

      {/* Chat Box - Takes remaining space, hidden on mobile */}
      <div className="hidden md:block flex-1 min-w-0">
        <ChatBox />
      </div>
    </main>
  );
};

export default Messages;
