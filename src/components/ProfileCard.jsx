import FeedCard from "./FeedCard";
import { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import { useSelector, useDispatch } from "react-redux";
import { getUserPosts } from "../redux/postSlice";
import { getDiceBearAvatar } from "../utils/dicebear";
import { formatNumber } from "../utils/numbers";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";

const ProfileCard = () => {
  // state
  const [isUp, setIsUp] = useState(false);

  // redux
  const { user } = useSelector((state) => state.auth);
  const { userPosts, loading } = useSelector((state) => state.posts);

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetch posts when user loads
  useEffect(() => {
    if (user?._id) {
      dispatch(getUserPosts(user._id));
    }
  }, [user?._id, dispatch]);

  // click outside close
  const dropdownRef = useClickOutside(() => setIsUp(false));

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

          {/* STATS */}
          <div className="flex gap-4 justify-center md:justify-start">
            <p>
              <span className="font-semibold">
                {formatNumber(userPosts.length)}
              </span>{" "}
              Posts
            </p>
            <p>
              <span className="font-semibold">
                {formatNumber(user?.followers?.length || 0)}
              </span>{" "}
              Followers
            </p>
            <p>
              <span className="font-semibold">
                {formatNumber(user?.following?.length || 0)}
              </span>{" "}
              Following
            </p>
          </div>

          {/* BIO */}
          <p className="text-sm md:text-base">
            {user?.bio || "This user has no bio."}
          </p>

          {/* EDIT PROFILE BUTTON */}
          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-blue-500 py-2 px-4 rounded-xl font-medium w-full sm:w-auto text-center"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-6 pt-6">
        {loading && <p className="text-center text-gray-500">Loading posts…</p>}

        {!loading && userPosts.length === 0 && (
          <p className="text-center text-gray-400">No posts yet.</p>
        )}

        {!loading &&
          userPosts.map((post) => <FeedCard key={post._id} post={post} />)}
      </div>
    </main>
  );
};

export default ProfileCard;
