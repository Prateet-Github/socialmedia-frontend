import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Bell,
  Home,
  Mail,
  MoreVertical,
  Search,
  User2,
  Plus,
  Instagram,
  Edit,
  Menu,
  X,
} from "lucide-react";
import PostCard from "./PostCard";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getDiceBearAvatar } from "../utils/dicebear";
import { APP_NAME } from "../utils/constants";
import useClickOutside from "../hooks/useClickOutside";

const Left = ({ showLabels = true }) => {
  // state variables
  const [isUp, setIsUp] = useState(false);
  const [showPostCard, setShowPostCard] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // redux
  const { user } = useSelector((state) => state.auth);

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // click outside hook for dropdown
  const dropdownRef = useClickOutside(() => setIsUp(false));

  // handlers
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUp(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // nav items
  const navItems = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/notification", icon: Bell, label: "Notifications" },
    { to: "/messages", icon: Mail, label: "Messages" },
    { to: "/profile", icon: User2, label: "Profile" },
    { to: "/edit-profile", icon: Edit, label: "Edit Profile" },
  ];

  // JSX
  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="size-6" />
        ) : (
          <Menu className="size-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-40
          flex flex-col justify-between py-6 px-4 
          bg-white dark:bg-black
          border-r border-gray-200 dark:border-gray-800
          transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          w-64 lg:w-auto
        `}
      >
        <div className="flex flex-col gap-2">
          <Link
            to="/home"
            onClick={handleLinkClick}
            className={`flex items-center ${
              showLabels ? "justify-start" : "justify-center"
            } gap-3 p-2 rounded-2xl hover:opacity-90`}
          >
            <Instagram className="size-8 shrink-0 text-blue-500" />
            {showLabels && (
              <span className="text-blue-500 font-bold text-xl whitespace-nowrap">
                {APP_NAME}
              </span>
            )}
          </Link>

          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={label}
              title={label}
              to={to}
              onClick={handleLinkClick}
              className={`flex items-center ${
                showLabels ? "justify-start" : "justify-center"
              } gap-3 p-2 rounded-2xl dark:hover:bg-gray-800 hover:bg-gray-200 cursor-pointer`}
            >
              <Icon className="size-6 shrink-0" />
              {showLabels && (
                <span className="text-xl whitespace-nowrap">{label}</span>
              )}
            </Link>
          ))}

          <button
            title="Create Post"
            className="w-full"
            onClick={() => {
              setShowPostCard(true);
              setIsMobileMenuOpen(false);
            }}
          >
            <div
              className={`flex ${
                showLabels ? "justify-start" : "justify-center"
              } items-center gap-3 p-2 rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer`}
            >
              <Plus className="size-6 shrink-0 text-white" />
              {showLabels && (
                <span className="text-xl text-white whitespace-nowrap">
                  Create Post
                </span>
              )}
            </div>
          </button>
        </div>

        {/* FIXED: Wrapped both button and dropdown in ref container */}
        <div ref={dropdownRef} className="relative w-full">
          <button onClick={() => setIsUp(!isUp)} className="w-full">
            <div
              title="Options"
              className={`flex ${
                showLabels ? "justify-between" : "justify-center"
              } items-center gap-3 p-2 rounded-full dark:hover:bg-gray-800 hover:bg-gray-200 cursor-pointer`}
            >
              <img
                src={user?.avatar || getDiceBearAvatar(user?.name)}
                alt="Profile"
                className="size-10 object-cover rounded-full shrink-0"
              />
              {showLabels && (
                <>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h1 className="font-semibold truncate">{user?.name}</h1>
                    <p className="text-sm truncate">@{user?.username}</p>
                  </div>
                  <MoreVertical className="size-5 shrink-0 border-2 rounded-full" />
                </>
              )}
            </div>
          </button>

          {isUp && (
            <div className="fixed bottom-20 bg-white dark:bg-black left-2 lg:left-20 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden w-72 z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.avatar || getDiceBearAvatar(user?.name)}
                    alt="Profile"
                    className="size-10 object-cover rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{user?.name}</p>
                    <p className="text-sm text-gray-400 truncate">
                      @{user?.username}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800"></div>
              <button
                onClick={handleLogout}
                className="w-full text-left cursor-pointer px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
              >
                <span className="font-medium">Log out {user?.name}</span>
              </button>
              <div className="border-t border-gray-200 dark:border-gray-800"></div>
            </div>
          )}
        </div>
      </aside>

      {/* PostCard Modal - Rendered outside sidebar at root level */}
      {showPostCard && <PostCard onClose={() => setShowPostCard(false)} />}
    </>
  );
};

export default Left;
