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
    <aside className="h-screen border-r sticky top-0 py-6 px-4 overflow-hidden">
      <div className="flex flex-col gap-2">
        {[
          { to: "/", icon: Instagram, label: "Instagram" },
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
            className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-2xl hover:bg-gray-900"
          >
            <Icon className="size-6 flex-shrink-0" />
            <span className="hidden lg:inline whitespace-nowrap">{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Left;