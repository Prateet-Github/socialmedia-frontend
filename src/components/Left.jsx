import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Bell,
  Home,
  Mail,
  MoreVertical,
  Search,
  User2,
  Plus,
  Edit,
  Menu,
  X,
} from "lucide-react";
import PostCard from "./PostCard";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { toast } from "react-hot-toast";
import { getDiceBearAvatar } from "../utils/dicebear";
import { APP_NAME } from "../utils/constants";
import useClickOutside from "../hooks/useClickOutside";
import Logo from "./Logo";

// 🔥 import unread selector
import { selectUnreadCount } from "../redux/notificationSlice";

const Left = ({ showLabels = true }) => {
  const [isUp, setIsUp] = useState(false);
  const [showPostCard, setShowPostCard] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // 🔥 unread notifications
  const unreadCount = useSelector(selectUnreadCount);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useClickOutside(() => setIsUp(false));

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (to) => {
    // If already on the page, refresh it
    if (location.pathname === to) {
      window.location.reload();
    } else {
      navigate(to);
    }
    handleLinkClick();
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUp(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },

    // 🔥 replace icon later
    { to: "/notification", icon: Bell, label: "Notifications" },

    { to: "/messages", icon: Mail, label: "Messages" },
    { to: "/profile", icon: User2, label: "Profile" },
    { to: "/edit-profile", icon: Edit, label: "Edit Profile" },
  ];

  return (
    <>
      {/* mobile button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-2 left-2 z-50 p-2 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg"
      >
        {isMobileMenuOpen ? (
          <X className="size-6" />
        ) : (
          <Menu className="size-6" />
        )}
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-40
          flex flex-col justify-between pb-4 pt-12 px-4 
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
        <div className="flex flex-col gap-3">
          {/* Logo */}
          <div
            onClick={() => {
              // Check if already on home page
              if (location.pathname === "/home") {
                window.location.reload();
              } else {
                navigate("/home");
              }
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer mb-4 hover:opacity-80 transition-opacity"
          >
            <Logo size={40} />
            {showLabels && (
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {APP_NAME}
              </span>
            )}
          </div>
          {navItems.map(({ to, icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => handleNavClick(to)}
              className="flex items-center cursor-pointer gap-4 p-3 rounded-full dark:hover:bg-white/10 hover:bg-black/10 w-full text-left"
            >
              {/* 🔥 custom notification icon with badge */}
              {label === "Notifications" ? (
                <div className="relative">
                  <Bell className="size-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0">
                      {unreadCount}
                    </span>
                  )}
                </div>
              ) : (
                <Icon className="size-6" />
              )}

              {showLabels && <span className="text-xl">{label}</span>}
            </button>
          ))}

          <button
            title="Create Post"
            onClick={() => {
              setShowPostCard(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full cursor-pointer"
          >
            <div className="flex items-center gap-3 p-3 rounded-full bg-blue-500 hover:bg-blue-600">
              <Plus className="size-6 text-white" />
              {showLabels && (
                <span className="text-xl text-white">Create Post</span>
              )}
            </div>
          </button>
        </div>

        {/* user dropdown */}
        <div ref={dropdownRef} className="relative w-full">
          <button onClick={() => setIsUp(!isUp)} className="w-full">
            <div
              title="Options"
              className={`flex ${
                showLabels ? "justify-between" : "justify-center"
              } items-center p-2 rounded-full dark:hover:bg-white/10 hover:bg-black/10 cursor-pointer`}
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

      {showPostCard && <PostCard onClose={() => setShowPostCard(false)} />}
    </>
  );
};

export default Left;
