import Left from "../components/Left";
import Notification from "../components/Notification";

const Notifications = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto max-w-6xl pt-16 lg:pt-0">
      {/* Left Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 border-r border-gray-200 dark:border-gray-800">
        <Left />
      </div>

      {/* Mobile hamburger menu - Only renders on mobile */}
      <div className="lg:hidden">
        <Left />
      </div>

      {/* Center Feed - Flexible, with max width */}
      <div className="flex-1 min-w-0 max-w-2xl flex flex-col">
        <Notification />

      </div>

      {/* Right Sidebar - Fixed width, hidden on small screens */}
      {/* <div className="hidden border-l border-gray-200 dark:border-gray-800 lg:block w-80 xl:w-96 shrink-0">
  
      </div> */}
    </main>
  );
};

export default Notifications;