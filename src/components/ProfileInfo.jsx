import { Calendar, MapPin, User, Mail } from "lucide-react";
import { formatDate } from "../utils/time";

const ProfileInfo = ({ user }) => {
  if (!user) return null;

  return (
    <article className="w-72 dark:bg-black bg-white flex flex-col gap-2 sm:gap-4 p-3 sm:p-2 border rounded-xl shadow-lg">
      {/* Date joined */}
      <div className="flex gap-3 sm:gap-4 p-2 sm:p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
        <Calendar className="size-5 sm:size-6 shrink-0 text-blue-600 dark:text-blue-400" />
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-sm sm:text-base">Date joined</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {formatDate(user?.createdAt)}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="flex gap-3 sm:gap-4 p-2 sm:p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
        <MapPin className="size-5 sm:size-6 shrink-0 text-green-600 dark:text-green-400" />
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-sm sm:text-base">Location</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {user?.location || "Not specified"}
          </p>
        </div>
      </div>

      {/* Website */}
      <div className="flex gap-3 sm:gap-4 p-2 sm:p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
        <User className="size-5 sm:size-6 shrink-0 text-purple-600 dark:text-purple-400" />
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-sm sm:text-base">Website</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {user?.website || "Not specified"}
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex gap-3 sm:gap-4 p-2 sm:p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
        <Mail className="size-5 sm:size-6 shrink-0 text-orange-600 dark:text-orange-400" />
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-sm sm:text-base">Email</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProfileInfo;
