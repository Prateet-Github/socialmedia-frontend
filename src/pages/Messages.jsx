import Left from "../components/Left";
import Chats from "../components/Chats";
import ChatBox from "../components/ChatBox";
import { Search } from "lucide-react";

const Messages = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      <div className="w-1/12">
        <Left />
      </div>
      <div className="w-3/12">
        <div className="flex relative p-4 border-b">
          <Search className="text-gray-300 absolute left-8 top-6" />
          <input
            type="text"
            placeholder="         Search"
            className="bg-gray-950 p-2 border outline-none w-full rounded-full"
          />
        </div>
        <Chats />
        <Chats />
      </div>
      <div className="w-8/12 border-l">
        <ChatBox />
      </div>
    </main>
  );
};

export default Messages;
