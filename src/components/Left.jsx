import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  Bell,
  HomeIcon,
  Mail,
  MoreVertical,
  Search,
  User2,
  PlusIcon,
  Instagram,
  Edit,
} from "lucide-react";
import PostCard from "./PostCard";

const Left = ({ showLabels = true }) => {
  const [isUp, setIsUp] = useState(false);
  const [showPostCard, setShowPostCard] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUp(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className="flex border-r flex-col justify-between h-screen sticky top-0 py-6 px-4 overflow-hidden">
      <div className="flex flex-col gap-2">
        <Link
          to="/home"
          className={`flex items-center ${
            showLabels ? "justify-center lg:justify-start" : "justify-center"
          } gap-3 p-2 rounded-2xl hover:opacity-90`}
        >
          <Instagram className="size-8 shrink-0 text-blue-500" />
          {showLabels && (
            <span className="hidden text-blue-500 lg:inline font-bold text-xl whitespace-nowrap">
              GeeksGram
            </span>
          )}
        </Link>
        {[
          { to: "/home", icon: HomeIcon, label: "Home" },
          { to: "/search", icon: Search, label: "Search" },
          { to: "/notification", icon: Bell, label: "Notifications" },
          { to: "/messages", icon: Mail, label: "Messages" },
          { to: "/profile", icon: User2, label: "Profile" },
          { to: "/edit-profile", icon: Edit, label: "Edit Profile" },
        ].map(({ to, icon: Icon, label }) => (
          <Link
            key={label}
            title={label}
            to={to}
            className={`flex items-center ${
              showLabels ? "justify-center lg:justify-start" : "justify-center"
            } gap-3 p-2 rounded-2xl dark:hover:bg-gray-800 hover:bg-gray-200 cursor-pointer`}
          >
            <Icon className="size-6 shrink-0" />
            {showLabels && (
              <span className="hidden text-xl lg:inline whitespace-nowrap">
                {label}
              </span>
            )}
          </Link>
        ))}
        <button
          title="Create Post"
          className="w-full"
          onClick={() => setShowPostCard(true)}
        >
          <div
            className={`flex  ${
              showLabels ? "justify-center lg:justify-start" : "justify-center"
            } items-center gap-3 p-2 rounded-2xl bg-blue-600 hover:bg-blue-700 cursor-pointer`}
          >
            <PlusIcon className="size-6 shrink-0 text-white" />
            {showLabels && (
              <span className="hidden text-xl lg:inline text-white whitespace-nowrap">
                Create Post
              </span>
            )}
          </div>
        </button>
        {showPostCard && <PostCard onClose={() => setShowPostCard(false)} />}
      </div>

      <button
        onClick={() => setIsUp(!isUp)}
        ref={dropdownRef}
        className="w-full"
      >
        <div
          title="Options"
          className={`flex ${
            showLabels ? "justify-center lg:justify-between" : "justify-center"
          } items-center gap-3 p-2 rounded-2xl  dark:hover:bg-gray-800 hover:bg-gray-200  cursor-pointer`}
        >
          <img
            src="./pfp.jpeg"
            alt="Profile"
            className="size-10 object-cover rounded-full shrink-0"
          />
          {showLabels && (
            <>
              <div className="hidden lg:flex flex-col flex-1 min-w-0">
                <h1 className="font-semibold truncate">Prateet Tiwari</h1>
                <p className="text-sm truncate">@prateettiwari</p>
              </div>
              <MoreVertical className="hidden lg:block size-5 shrink-0 border-2 rounded-full" />
            </>
          )}
        </div>
      </button>
      {isUp && (
        <div className="fixed bottom-20 bg-white dark:bg-black left-2 lg:left-20 border border-gray-300 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden w-72 z-50">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <img
                src="./pfp.jpeg"
                alt="Profile"
                className="size-10 object-cover rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">Prateet Tiwari</p>
                <p className="text-sm text-gray-400 truncate">@prateettiwari</p>
              </div>
            </div>
          </div>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-900  transition-colors">
            <span className="font-medium">Add an existing account</span>
          </button>
          <div className="border-t  border-gray-300 dark:border-gray-800"></div>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-900  transition-colors">
            <span className="font-medium">Log out @prateettiwari</span>
          </button>
          <div className="border-t  border-gray-300 dark:border-gray-800"></div>
        </div>
      )}
    </aside>
  );
};

export default Left;
