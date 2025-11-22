import { Link } from "react-router-dom";
import {
  Bell,
  HomeIcon,
  Mail,
  MoreVertical,
  PresentationIcon,
  Search,
  User2,
  PlusIcon,
} from "lucide-react";

const Left = () => {
  return (
    <main className="border-r h-screen sticky flex flex-col items-center justify-between py-6 px-10 top-0">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-4xl px-4 w-full truncate">Social Media</h1>
        <Link
          to="/"
          className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
        >
          <HomeIcon className="flex-shrink-0" />
          <p className="truncate w-full">Home</p>
        </Link>
        <Link
          to="/login"
          className="flex  gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
        >
          <Search className="flex-shrink-0" />
          <p className="truncate w-full">Search</p>
        </Link>
        <Link
          to="/login"
          className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl items-center"
        >
          <Bell className="flex-shrink-0" /> {/* ICON NEVER SHRINKS */}
          <p className="truncate w-full">Notifications</p>{" "}
          {/* TEXT TRUNCATES */}
        </Link>
        <Link
          to="/login"
          className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
        >
          <Mail className="flex-shrink-0" />
          <p className="truncate w-full">Messages</p>
        </Link>
        <Link
          to="/login"
          className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
        >
          <PresentationIcon className="flex-shrink-0" />
          <p className="truncate w-full">Premium</p>
        </Link>
        <Link
          to="/profile"
          className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
        >
          <User2 className="flex-shrink-0" />
          <p className="truncate w-full">Profile</p>
        </Link>
        <Link
          to="/login"
          className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
        >
          <MoreVertical className="border-2 rounded-full flex-shrink-0" />
          <p className="truncate w-full">More</p>
        </Link>
        <Link
          to="/login"
          className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
        >
          <PlusIcon className="border-2 rounded-full flex-shrink-0" />
          <p className="truncate w-full">Post</p>
        </Link>
      </div>
    </main>
  );
};

export default Left;
