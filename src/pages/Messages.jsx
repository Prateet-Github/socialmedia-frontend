import Left from "../components/Left";
import Chats from "../components/Chats";
import ChatBox from "../components/ChatBox";
import { Search } from "lucide-react";

const Messages = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      <div className="w-1/16">
        <Left />
      </div>
      <div className="w-4/16">
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
      <div className="w-11/16 border-l">
        <ChatBox />
      </div>
    </main>
  );
};

export default Messages;
