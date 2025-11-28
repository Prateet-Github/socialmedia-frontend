import Left from "../components/Left";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto max-w-6xl">
      {/* Left Sidebar - Fixed width */}
      <div className="w-22 lg:w-64 xl:w-72 shrink-0 border-r  border-gray-300 dark:border-gray-800">
        <Left />
      </div>

      {/* Profile Content - Centered with max width */}
      <div className="flex-1 min-w-0 flex  items-center mx-auto">
        <div className="w-full max-w-4xl px-4">
          <ProfileCard />
        </div>
      </div>
    </main>
  );
};

export default Profile;
