import FeedCard from "./FeedCard";
import { useRef, useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import { useSelector, useDispatch } from "react-redux";
import { getUserPosts } from "../redux/postSlice";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const { userPosts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // fetch posts
  useEffect(() => {
    if (user?._id) {
      dispatch(getUserPosts(user._id));
    }
  }, [user, dispatch]);

  const dropdownRef = useRef(null);
  const [isUp, setIsUp] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUp(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="w-full max-w-3xl p-4 md:p-8 flex flex-col gap-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsUp(!isUp)}
            title="Profile Info"
            className="hover:text-gray-300 transition-colors cursor-pointer"
          >
            <img
              src={
                user?.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`
              }
              alt="pfp"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-cover rounded-full border"
            />
          </button>

          {isUp && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50">
              <ProfileInfo user={user} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 flex-1 text-center md:text-left">
          <div>
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
            <p className="font-medium">@{user?.username}</p>
          </div>

          <div className="flex gap-4 justify-center md:justify-start">
            <p>
              <span className="font-semibold">{userPosts?.length || 0}</span>{" "}
              Posts
            </p>
            <p>
              <span className="font-semibold">
                {user?.followers?.length || 0}
              </span>{" "}
              Followers
            </p>
            <p>
              <span className="font-semibold">
                {user?.following?.length || 0}
              </span>{" "}
              Following
            </p>
          </div>

          <div>
            <p className="text-sm md:text-base">
              {user?.bio || "This user has no bio."}
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="flex flex-col gap-6 pt-6">
        {loading && <p className="text-center text-gray-500">Loading posts…</p>}

        {!loading && userPosts.length === 0 && (
          <p className="text-center text-gray-500">No posts yet.</p>
        )}

        {userPosts.map((post) => (
          <FeedCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default ProfileCard;
