import Left from "../components/Left";
import Notification from "../components/Notification";

const Notifications = () => {
  // JSX
  return (
    <main className="flex min-h-screen w-full mx-auto max-w-6xl pt-16 lg:pt-0">
      {/* Left Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 border-r border-gray-200/60 dark:border-gray-800/60">
        <Left />
      </div>

      {/* Mobile hamburger menu - Only renders on mobile */}
      <div className="lg:hidden">
        <Left />
      </div>

      <div className="flex-1 min-w-0 max-w-2xl flex flex-col">
        <Notification />
      </div>
    </main>
  );
};

export default Notifications;
