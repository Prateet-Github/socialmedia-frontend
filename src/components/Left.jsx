import { Link } from "react-router-dom";
import {
  Bell,
  HomeIcon,
  Mail,
  MoreVertical,
  Search,
  User2,
  PlusIcon,
  Instagram,
} from "lucide-react";

const Left = ({ showLabels = true }) => {
  return (
    <aside className="flex border-r flex-col justify-between h-screen sticky top-0 py-6 px-4 overflow-hidden">
      <div className="flex flex-col gap-2">
        {[
          { to: "/", icon: Instagram, label: "Instagram" },
          { to: "/", icon: HomeIcon, label: "Home" },
          { to: "/search", icon: Search, label: "Search" },
          { to: "/notification", icon: Bell, label: "Notifications" },
          { to: "/messages", icon: Mail, label: "Messages" },
          { to: "/profile", icon: User2, label: "Profile" },
          { to: "/more", icon: MoreVertical, label: "More" },
          { to: "/post", icon: PlusIcon, label: "Post" },
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
              <span className="hidden lg:inline whitespace-nowrap">
                {label}
              </span>
            )}
          </Link>
        ))}
      </div>

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
            <MoreVertical className="hidden lg:block size-5 flex-shrink-0" />
          </>
        )}
      </div>
    </aside>
  );
};

export default Left;