import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Left from "../components/Left";
import FeedCard from "../components/FeedCard";
import ProfileInfo from "../components/ProfileInfo";
import axios from "axios";
import { getDiceBearAvatar } from "../utils/dicebear";
import { formatNumber } from "../utils/numbers";
import useClickOutside from "../hooks/useClickOutside";

const API_URL = "http://localhost:5001/api/users";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const { username } = useParams();
  const dropdownRef = useClickOutside(() => setShowInfo(false));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/public/${username}`);
        setProfile(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchProfile();
  }, [username]);

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
                    <p><span className="font-semibold">{formatNumber(posts.length)}</span> Posts</p>
                    <p><span className="font-semibold">{formatNumber(profile.followers?.length || 0)}</span> Followers</p>
                    <p><span className="font-semibold">{formatNumber(profile.following?.length || 0)}</span> Following</p>
                  </div>

                  <p>{profile.bio || "This user has no bio."}</p>

                  <div className="flex gap-3 pt-2 w-full">
                    <button className="flex-1 text-white py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700">Follow</button>
                    <button className="flex-1 text-white py-2 px-4 rounded-xl bg-gray-700 hover:bg-gray-600">Message</button>
                  </div>
                </div>
              </div>

              <div className="border-t dark:border-gray-800 pt-6 flex flex-col items-center gap-6">
                {posts.length === 0 && <p>No posts from this user yet.</p>}
                {posts.map((post) => <FeedCard key={post._id} post={post} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserProfile;