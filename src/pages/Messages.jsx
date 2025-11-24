import Left from "../components/Left";
import Chats from "../components/Chats";
import ChatBox from "../components/ChatBox";
import { Search } from "lucide-react";

const Messages = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      {/* Left Sidebar - Fixed width */}
      <div className="w-22 flex-shrink-0 border-r">
        <Left showLabels={false} />
      </div>

      {/* Chats List - Fixed width */}
      <div className="w-80 lg:w-72 flex-shrink-0 border-r">
        <div className="flex relative p-4 border-b">
          <Search className="text-gray-400 absolute left-7 top-1/2 -translate-y-1/2 size-5" />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-950 p-2 pl-10 border outline-none w-full rounded-full"
          />
        </div>
        <Chats />
        <Chats />
      </div>

      {/* Chat Box - Takes remaining space */}
      <div className="flex-1 min-w-0">
        <ChatBox />
      </div>
    </main>
  );
};

export default Messages;
