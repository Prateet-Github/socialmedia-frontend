import Left from "../components/Left";
import Notification from "../components/Notification";

const Notifications = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      <div className="w-1/4">
        <Left />
      </div>
      <div className="w-2/4">
        <Notification />
        <Notification />
      </div>
      <div className="w-1/4 border-l h-screen top-0 sticky px-4 py-6 flex flex-col gap-4"></div>
    </main>
  );
};

export default Notifications;
