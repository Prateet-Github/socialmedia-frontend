import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Left from "../components/Left";
import FeedCard from "../components/FeedCard";
import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

const UserProfile = () => {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_URL}/public/${username}`);
        setProfile(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load user profile"
        );
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchProfile();
  }, [username]);

  const avatarSrc =
    profile?.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      profile?.name || username
    )}`;

  return (
    <main className="flex min-h-screen w-full mx-auto max-w-6xl pt-16 lg:pt-0">
      {/* Sidebar */}
      <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 border-r border-gray-200 dark:border-gray-800">
        <Left />
      </div>
      <div className="lg:hidden">
        <Left />
      </div>

      {/* Profile + posts */}
      <div className="flex-1 min-w-0 flex justify-center">
        <div className="w-full max-w-3xl p-4 md:p-8">
          {loading && (
            <p className="text-center text-gray-400 mt-10">
              Loading profile…
            </p>
          )}

          {error && !loading && (
            <p className="text-center text-red-500 mt-10">{error}</p>
          )}

          {!loading && profile && (
            <>
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-6">
                <img
                  src={avatarSrc}
                  alt="pfp"
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-cover rounded-full border"
                />

                <div className="flex flex-col gap-3 flex-1 text-center md:text-left">
                  <div>
                    <h1 className="text-2xl font-semibold">{profile.name}</h1>
                    <p className="font-medium">@{profile.username}</p>
                  </div>

                  <div className="flex gap-4 justify-center md:justify-start">
                    <p>
                      <span className="font-semibold">{posts.length}</span> Posts
                    </p>
                    <p>
                      <span className="font-semibold">
                        {profile.followers?.length || 0}
                      </span>{" "}
                      Followers
                    </p>
                    <p>
                      <span className="font-semibold">
                        {profile.following?.length || 0}
                      </span>{" "}
                      Following
                    </p>
                  </div>

                  <p className="text-sm md:text-base">
                    {profile.bio || "This user has no bio."}
                  </p>

                  {/* Follow / Message (just UI for now) */}
                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 text-white py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors font-medium">
                      Follow
                    </button>
                    <button className="flex-1 text-white py-2 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors font-medium">
                      Message
                    </button>
                  </div>
                </div>
              </div>

              {/* Posts */}
              <div className="border-t border-gray-300 dark:border-gray-800 pt-6 flex flex-col items-center gap-6">
                {posts.length === 0 && (
                  <p className="text-gray-400 text-center">
                    No posts from this user yet.
                  </p>
                )}

                {posts.map((post) => (
                  <FeedCard key={post._id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserProfile;