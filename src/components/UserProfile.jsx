import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Left from "../components/Left";
import FeedCard from "../components/FeedCard";
import ProfileInfo from "../components/ProfileInfo";
import { getDiceBearAvatar } from "../utils/dicebear";
import { formatNumber } from "../utils/numbers";
import useClickOutside from "../hooks/useClickOutside";
import { 
  fetchPublicProfile, 
  followUserProfile, 
  unfollowUserProfile,
  clearProfile 
} from "../redux/userSlice";

const UserProfile = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  const { username } = useParams();
  const navigate = useNavigate();
  const dropdownRef = useClickOutside(() => setShowInfo(false));
  
  const dispatch = useDispatch();
  const { user: currentUser, token } = useSelector((state) => state.auth);
  const { profile, posts, loading, error, followLoading } = useSelector(
    (state) => state.publicUser
  );

  // Check if current user is following this profile
  const isFollowing = profile?.followers?.some(
    (follower) => follower._id === currentUser?._id || follower === currentUser?._id
  );

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    if (username) {
      dispatch(fetchPublicProfile(username));
    }
    
    // Cleanup on unmount
    return () => {
      dispatch(clearProfile());
    };
  }, [username, dispatch]);

  const handleFollowToggle = async () => {
    if (!currentUser) {
      alert("Please login to follow users");
      return;
    }

    try {
      if (isFollowing) {
        await dispatch(unfollowUserProfile({ username, token })).unwrap();
      } else {
        await dispatch(followUserProfile({ username, token })).unwrap();
      }
    } catch (err) {
      console.error("Follow/Unfollow error:", err);
    }
  };

  return (
    <main className="flex min-h-screen w-full mx-auto max-w-6xl pt-16 lg:pt-0">
      
      <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 border-r dark:border-gray-800">
        <Left />
      </div>
      <div className="lg:hidden">
        <Left />
      </div>

      <div className="flex-1 min-w-0 flex justify-center">
        <div className="w-full max-w-3xl p-4 md:p-8">
          
          {loading && <p className="text-center mt-10">Loading profile…</p>}
          {error && !loading && <p className="text-center text-red-500 mt-10">{error}</p>}

          {!loading && profile && (
            <>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-6">
                
                <div className="relative shrink-0" ref={dropdownRef}>
                  <img
                    src={profile.avatar || getDiceBearAvatar(profile.name)}
                    alt=""
                    onClick={() => setShowInfo(!showInfo)}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border cursor-pointer"
                  />
                  {showInfo && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50">
                      <ProfileInfo user={profile} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-semibold">{profile.name}</h1>
                  <p className="font-medium">@{profile.username}</p>

                  <div className="flex gap-4 justify-center md:justify-start">
                    <button
                      onClick={() => setActiveTab("posts")}
                      className={`hover:underline ${
                        activeTab === "posts" ? "text-blue-500" : ""
                      }`}
                    >
                      <span className="font-semibold">{formatNumber(posts.length)}</span> Posts
                    </button>
                    <button
                      onClick={() => setActiveTab("followers")}
                      className={`hover:underline ${
                        activeTab === "followers" ? "text-blue-500" : ""
                      }`}
                    >
                      <span className="font-semibold">
                        {formatNumber(profile.followers?.length || 0)}
                      </span> Followers
                    </button>
                    <button
                      onClick={() => setActiveTab("following")}
                      className={`hover:underline ${
                        activeTab === "following" ? "text-blue-500" : ""
                      }`}
                    >
                      <span className="font-semibold">
                        {formatNumber(profile.following?.length || 0)}
                      </span> Following
                    </button>
                  </div>

                  <p>{profile.bio || "This user has no bio."}</p>

                  {!isOwnProfile && (
                    <div className="flex gap-3 pt-2 w-full">
                      <button 
                        onClick={handleFollowToggle}
                        disabled={followLoading}
                        className={`flex-1 text-white py-2 px-4 rounded-xl ${
                          isFollowing 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } disabled:opacity-50 disabled:cursor-not-allowed transition`}
                      >
                        {followLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                      <button className="flex-1 text-white py-2 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition">
                        Message
                      </button>
                    </div>
                  )}

                  {isOwnProfile && (
                    <button
                      onClick={() => navigate("/edit-profile")}
                      className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-xl font-medium transition"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Tabs Section */}
              <div className="border-t dark:border-gray-800 pt-6">
                {/* Posts Tab */}
                {activeTab === "posts" && (
                  <div className="flex flex-col items-center gap-6">
                    {posts.length === 0 && <p className="text-gray-400">No posts from this user yet.</p>}
                    {posts.map((post) => <FeedCard key={post._id} post={post} />)}
                  </div>
                )}

                {/* Followers Tab */}
                {activeTab === "followers" && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold mb-2">Followers</h2>
                    {profile.followers?.length === 0 ? (
                      <p className="text-center text-gray-400">No followers yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {profile.followers?.map((follower) => (
                          <div
                            key={follower._id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                            onClick={() => navigate(`/profile/${follower.username}`)}
                          >
                            <img
                              src={follower.avatar || getDiceBearAvatar(follower.name)}
                              alt=""
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-semibold">{follower.name}</p>
                              <p className="text-sm text-gray-500">@{follower.username}</p>
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
                    {profile.following?.length === 0 ? (
                      <p className="text-center text-gray-400">Not following anyone yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {profile.following?.map((following) => (
                          <div
                            key={following._id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                            onClick={() => navigate(`/profile/${following.username}`)}
                          >
                            <img
                              src={following.avatar || getDiceBearAvatar(following.name)}
                              alt=""
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-semibold">{following.name}</p>
                              <p className="text-sm text-gray-500">@{following.username}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserProfile;