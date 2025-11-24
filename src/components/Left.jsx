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
  Sun,
  User,
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
          to="/"
          className={`flex items-center ${
            showLabels ? "justify-center lg:justify-start" : "justify-center"
          } gap-3 p-2 rounded-2xl hover:bg-gray-900`}
        >
          <Instagram className="size-8 flex-shrink-0 text-blue-500" />
          {showLabels && (
            <span className="hidden text-blue-500 lg:inline font-bold text-xl whitespace-nowrap">
              GeeksGram
            </span>
          )}
        </Link>
        {[
          { to: "/", icon: HomeIcon, label: "Home" },
          { to: "/search", icon: Search, label: "Search" },
          { to: "/notification", icon: Bell, label: "Notifications" },
          { to: "/messages", icon: Mail, label: "Messages" },
          { to: "/profile", icon: User2, label: "Profile" },
        ].map(({ to, icon: Icon, label }) => (
          <Link
            key={label}
            to={to}
            className={`flex items-center ${
              showLabels ? "justify-center lg:justify-start" : "justify-center"
            } gap-3 p-2 rounded-2xl hover:bg-gray-900`}
          >
            <Icon className="size-6 flex-shrink-0" />
            {showLabels && (
              <span className="hidden text-xl lg:inline whitespace-nowrap">
                {label}
              </span>
            )}
          </Link>
        ))}
        <button className="w-full" onClick={() => setShowPostCard(true)}>
          <div
            className={`flex  ${
              showLabels ? "justify-center lg:justify-start" : "justify-center"
            } items-center gap-3 p-2 rounded-2xl bg-blue-600 hover:bg-blue-700 cursor-pointer`}
          >
            <PlusIcon className="size-6 flex-shrink-0 text-white" />
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
          className={`flex ${
            showLabels ? "justify-center lg:justify-between" : "justify-center"
          } items-center gap-3 p-2 rounded-2xl hover:bg-gray-900 cursor-pointer`}
        >
          <img
            src="./pfp.jpeg"
            alt="Profile"
            className="size-10 object-cover rounded-full flex-shrink-0"
          />
          {showLabels && (
            <>
              <div className="hidden lg:flex flex-col flex-1 min-w-0">
                <h1 className="font-semibold truncate">Prateet Tiwari</h1>
                <p className="text-gray-400 text-sm truncate">@prateettiwari</p>
              </div>
              <MoreVertical className="hidden lg:block size-5 flex-shrink-0 border-2 rounded-full" />
            </>
          )}
        </div>
      </button>
      {isUp && (
        <div className="fixed bottom-20 left-2 lg:left-20 bg-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden w-72 z-50">
          <div className="px-4 py-3 border-b border-gray-800">
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
          <button className="w-full text-left px-4 py-3 hover:bg-gray-900 transition-colors">
            <span className="font-medium">Add an existing account</span>
          </button>
          <div className="border-t border-gray-800"></div>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-900 transition-colors">
            <span className="font-medium">Log out @prateettiwari</span>
          </button>
          <div className="border-t border-gray-800"></div>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-900 transition-colors">
            <Sun className="size-5" />
            <span className="font-medium">Dark Mode</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Left;
