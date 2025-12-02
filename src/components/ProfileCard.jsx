import FeedCard from "./FeedCard";
import { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import { useSelector, useDispatch } from "react-redux";
import { getUserPosts } from "../redux/postSlice";
import { getDiceBearAvatar } from "../utils/dicebear";
import { formatNumber } from "../utils/numbers";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import { fetchCurrentUserProfile } from "../redux/authSlice";

const ProfileCard = () => {
  // state
  const [isUp, setIsUp] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  // redux
  const { user } = useSelector((state) => state.auth);
  const { userPosts, loading } = useSelector((state) => state.posts);

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fixed: Single useEffect
  useEffect(() => {
    if (user?._id) {
      dispatch(getUserPosts(user._id));
      dispatch(fetchCurrentUserProfile());
    }
  }, [user?._id, dispatch]);

  // click outside close
  const dropdownRef = useClickOutside(() => setIsUp(false));

  const handleStatClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="w-full max-w-3xl p-4 md:p-8 flex flex-col gap-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
        {/* PROFILE IMAGE + INFO DROPDOWN */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsUp(!isUp)}
            title="Profile Info"
            className="hover:opacity-90 transition"
          >
            <img
              src={user?.avatar || getDiceBearAvatar(user?.name)}
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

        {/* NAME + STATS + BIO + EDIT BUTTON */}
        <div className="flex flex-col gap-4 flex-1 text-center md:text-left">
          {/* Name */}
          <div>
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
            <p className="font-medium">@{user?.username}</p>
          </div>

          {/* STATS - Now clickable */}
          <div className="flex gap-4 justify-center md:justify-start">
            <button
              onClick={() => handleStatClick("posts")}
              className={`hover:underline ${
                activeTab === "posts" ? "text-blue-500" : ""
              }`}
            >
              <span className="font-semibold">
                {formatNumber(userPosts.length)}
              </span>{" "}
              Posts
            </button>
            <button
              onClick={() => handleStatClick("followers")}
              className={`hover:underline ${
                activeTab === "followers" ? "text-blue-500" : ""
              }`}
            >
              <span className="font-semibold">
                {formatNumber(user?.followers?.length || 0)}
              </span>{" "}
              Followers
            </button>
            <button
              onClick={() => handleStatClick("following")}
              className={`hover:underline ${
                activeTab === "following" ? "text-blue-500" : ""
              }`}
            >
              <span className="font-semibold">
                {formatNumber(user?.following?.length || 0)}
              </span>{" "}
              Following
            </button>
          </div>

          {/* BIO */}
          <p className="text-sm md:text-base">
            {user?.bio || "This user has no bio."}
          </p>

          {/* EDIT PROFILE BUTTON */}
          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-xl font-medium w-full sm:w-auto text-center transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-t dark:border-gray-800 pt-6">
        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div className="flex flex-col gap-6">
            {loading && (
              <p className="text-center text-gray-500">Loading posts…</p>
            )}

            {!loading && userPosts.length === 0 && (
              <p className="text-center text-gray-400">No posts yet.</p>
            )}

            {!loading &&
              userPosts.map((post) => <FeedCard key={post._id} post={post} />)}
          </div>
        )}

        {/* Followers Tab */}
        {activeTab === "followers" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2">Followers</h2>
            {user?.followers?.length === 0 ? (
              <p className="text-center text-gray-400">No followers yet.</p>
            ) : (
              <div className="space-y-3">
                {user?.followers?.map((follower) => (
                  <div
                    key={follower._id || follower}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                    onClick={() => navigate(`/user/${follower.username}`)}
                  >
                    <img
                      src={
                        follower.avatar ||
                        getDiceBearAvatar(follower.name || "User")
                      }
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">
                        {follower.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        @{follower.username || "username"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Following Tab */}
        {activeTab === "following" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2">Following</h2>
            {user?.following?.length === 0 ? (
              <p className="text-center text-gray-400">
                Not following anyone yet.
              </p>
            ) : (
              <div className="space-y-3">
                {user?.following?.map((following) => (
                  <div
                    key={following._id || following}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                    onClick={() => navigate(`/user/${following.username}`)}
                  >
                    <img
                      src={
                        following.avatar ||
                        getDiceBearAvatar(following.name || "User")
                      }
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">
                        {following.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        @{following.username || "username"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileCard;
