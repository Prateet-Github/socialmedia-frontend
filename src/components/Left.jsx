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
  Instagram,
} from "lucide-react";

const Left = () => {
  return (
    <aside className="border-r h-screen sticky top-0 py-6 px-4 overflow-hidden">
      <div className="flex flex-col gap-2">
        {/* APP NAME */}
        <Link
          to="/"
          className="flex items-center justify-center xl:justify-start gap-3 px-3 py-2 rounded-2xl hover:bg-gray-900"
        >
          <Instagram className="size-6 flex-shrink-0" />
          <p className="hidden xl:block text-xl font-semibold whitespace-nowrap truncate w-full">
            Instagram
          </p>
        </Link>

        {/* NAV LINKS */}
        {[
          { to: "/", icon: HomeIcon, label: "Home" },
          { to: "/search", icon: Search, label: "Search" },
          { to: "/notification", icon: Bell, label: "Notifications" },
          { to: "/messages", icon: Mail, label: "Messages" },
          { to: "/premium", icon: PresentationIcon, label: "Premium" },
          { to: "/profile", icon: User2, label: "Profile" },
          { to: "/more", icon: MoreVertical, label: "More" },
          { to: "/post", icon: PlusIcon, label: "Post" },
        ].map(({ to, icon: Icon, label }) => (
          <Link
            key={label}
            to={to}
            className="flex items-center justify-center xl:justify-start gap-3 px-3 py-2 rounded-2xl hover:bg-gray-900"
          >
            <Icon className="size-6 flex-shrink-0" />
            <p className="hidden xl:block whitespace-nowrap truncate w-full">{label}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Left;