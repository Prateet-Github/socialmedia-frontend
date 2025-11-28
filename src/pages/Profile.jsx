import Left from "../components/Left";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto max-w-6xl pt-18 lg:pt-0">
      {/* Left Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 border-r border-gray-200 dark:border-gray-800">
        <Left />
      </div>

      {/* Mobile hamburger menu - Only renders on mobile */}
      <div className="lg:hidden">
        <Left />
      </div>

      {/* Profile Content - Centered with max width */}
      <div className="flex-1 min-w-0 flex items-center mx-auto border-r border-gray-200 dark:border-gray-800">
        <div className="w-full max-w-4xl px-4">
          <ProfileCard />
        </div>
      </div>
    </main>
  );
};

export default Profile;