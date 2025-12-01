import Left from "../components/Left";
import ChatBox from "../components/ChatBox";
import Dm from "../components/Dm";

const Messages = () => {
  // JSX
  return (
    <main className="flex min-h-screen w-full mx-auto pt-16 lg:pt-0">
      {/* Left Sidebar - Hidden on mobile, icons only on desktop */}
      <div className="hidden md:block md:w-20 lg:w-22 shrink-0 border-r border-gray-200 dark:border-gray-800">
        <Left showLabels={false} />
      </div>

      {/* Mobile hamburger menu - Only renders on mobile */}
      <div className="md:hidden">
        <Left showLabels={true} />
      </div>

      {/* Chats List - Responsive width */}
      <div className="w-full md:w-80 lg:w-96 shrink-0 border-r border-gray-200 dark:border-gray-800">
        <Dm />
      </div>

      {/* Chat Box - Takes remaining space, hidden on mobile */}
      <div className="hidden md:block flex-1 min-w-0 border-l border-gray-200 dark:border-gray-800">
        <ChatBox />
      </div>
    </main>
  );
};

export default Messages;
