import Left from "../components/Left";
import ChatBox from "../components/ChatBox";
import Dm from "../components/Dm";

const Messages = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      {/* Left Sidebar - Icons only */}
      <div className="hidden md:block w-22 shrink-0 border-r">
        <Left showLabels={false} />
      </div>

      {/* Chats List - Responsive width */}
      <div className="w-full md:w-80 lg:w-96 shrink-0 border-r">
        <Dm />
      </div>

      {/* Chat Box - Takes remaining space, hidden on mobile */}
      <div className="hidden md:block flex-1 min-w-0">
        <ChatBox />
      </div>
    </main>
  );
};

export default Messages;
