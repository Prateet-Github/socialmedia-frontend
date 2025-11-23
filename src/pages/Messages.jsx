import Left from "../components/Left";
import Chats from "../components/Chats";
import ChatBox from "../components/ChatBox";

const Messages = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      <div className="w-1/12">
        <Left />
      </div>
      <div className="w-3/12">
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
