import { Calendar, MapPin, User, Mail } from "lucide-react";

const ProfileInfo = () => {
  return (
    <article className="w-72 dark:bg-black bg-white flex flex-col gap-2 sm:gap-4 p-3 sm:p-6 border rounded-xl shadow-lg">
      <div className="flex gap-3 sm:gap-4 p-2 sm:p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
        <Calendar className="size-5 sm:size-6 shrink-0 text-blue-600 dark:text-blue-400" />
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-sm sm:text-base">Date joined</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            December 2024
          </p>
        </div>
      </div>

      <div className="flex gap-3 sm:gap-4 p-2 sm:p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
        <MapPin className="size-5 sm:size-6 shrink-0 text-green-600 dark:text-green-400" />
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-sm sm:text-base">Account based in</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            India
          </p>
        </div>
      </div>

      <div className="flex gap-3 sm:gap-4 p-2 sm:p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
        <User className="size-5 sm:size-6 shrink-0 text-purple-600 dark:text-purple-400" />
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-sm sm:text-base">Account type</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Premium Member
          </p>
        </div>
      </div>

      <div className="flex gap-3 sm:gap-4 p-2 sm:p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
        <Mail className="size-5 sm:size-6 shrink-0 text-orange-600 dark:text-orange-400" />
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-sm sm:text-base">Email verified</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Yes
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProfileInfo;
