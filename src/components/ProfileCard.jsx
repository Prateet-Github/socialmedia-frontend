import FeedCard from "./FeedCard";
import { useRef, useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";

const ProfileCard = () => {
  const dropdownRef = useRef(null);
  const [isUp, setIsUp] = useState(false);
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
    <main className="w-full max-w-3xl p-4 md:p-8 flex flex-col gap-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
        {/* Profile Image */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsUp(!isUp)}
            title="Profile Info"
            className="hover:text-gray-300 transition-colors cursor-pointer"
          >
            <img
              src="./pfp.jpeg"
              alt="pfp"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-cover rounded-full border"
            />
          </button>

          {isUp && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50">
              <ProfileInfo />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex flex-col gap-4 flex-1 text-center md:text-left">
          <div>
            <h1 className="text-2xl font-semibold">Prateet Tiwari</h1>
            <p className="font-medium">@prateettiwari</p>
          </div>

          <div className="flex gap-4 justify-center md:justify-start">
            <p>
              <span className="font-semibold">50</span> Posts
            </p>
            <p>
              <span className="font-semibold">1.2K</span> Followers
            </p>
            <p>
              <span className="font-semibold">300</span> Following
            </p>
          </div>

          <div>
            <p className="text-sm md:text-base">
              Software Engineer | Tech Enthusiast | Open Source Contributor.
              Love coding and coffee!
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 border-b pb-6">
        <button className="flex-1 text-white py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors font-medium">
          Follow
        </button>
        <button className="flex-1 text-white py-2 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors font-medium">
          Message
        </button>
      </div>

      {/* Posts Grid */}
      <div className="flex flex-col gap-6 pt-6">
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
    </main>
  );
};

export default ProfileCard;
