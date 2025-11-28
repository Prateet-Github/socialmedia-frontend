import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <main className="border-b  border-gray-300 dark:border-gray-800 py-8 pl-4 flex gap-2 w-full">
      <Bell />
      <p>
        <span className="font-semibold hover:underline cursor-pointer">
          @prateettiwari
        </span>{" "}
        liked your post.
      </p>
    </main>
  );
};

export default Notification;
