import { Camera, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/authSlice";
import toast from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  // Store preview image and real file separately
  const [avatarFile, setAvatarFile] = useState(null);
  const [profileImage, setProfileImage] = useState(
    user?.avatar ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`
  );
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [website, setWebsite] = useState(user?.website || "");
  const [location, setLocation] = useState(user?.location || "");

  useEffect(() => {
    if (user) {
      setProfileImage(
        user.avatar ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`
      );
      setName(user.name || "");
      setBio(user.bio || "");
      setWebsite(user.website || "");
      setLocation(user.location || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file); // store REAL file
      setProfileImage(URL.createObjectURL(file)); // preview only
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();

    if (name !== user.name) formData.append("name", name);
    if (bio !== user.bio) formData.append("bio", bio);
    if (website !== user.website) formData.append("website", website);
    if (location !== user.location) formData.append("location", location);
    if (avatarFile) formData.append("avatar", avatarFile); // <– REAL File, not base64!

    if ([...formData.keys()].length === 0) {
      toast("Nothing to update");
      return;
    }

    const t = toast.loading("Saving profile...");

    dispatch(updateProfile(formData)).then((res) => {
      toast.dismiss(t);

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Profile updated successfully!");
        navigate("/profile");
      } else {
        toast.error(res.payload || "Failed to update profile");
      }
    });
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 border-gray-800 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-gray-900 p-2 rounded-full transition-colors"
            >
              <ArrowLeft className="size-5" />
            </button>
            <h1 className="text-lg md:text-xl font-semibold">Edit Profile</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="text-blue-500 cursor-pointer hover:text-blue-400 font-semibold text-sm md:text-base transition-colors disabled:opacity-60"
          >
            {loading ? "Saving..." : "Done"}
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="relative group">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-gray-700"
            />
            <label
              htmlFor="pfp"
              className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="size-6 md:size-7 text-white mb-1" />
              <span className="text-xs text-white font-medium">Change</span>
              <input
                type="file"
                id="pfp"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <label
            htmlFor="pfp"
            className="text-blue-500 text-sm font-semibold cursor-pointer hover:text-blue-400 transition-colors"
          >
            Change Profile Photo
          </label>
        </div>

        {/* Form Inputs — same as yours */}
        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors text-sm md:text-base"
              placeholder="Enter your name"
              maxLength={50}
            />
            <p className="text-xs text-gray-500 mt-1.5">{name.length}/50</p>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold mb-2">Username</label>
            <input
              type="text"
              value={user?.username}
              disabled
              className="w-full border border-gray-700 rounded-lg p-3 outline-none text-sm md:text-base text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors resize-none text-sm md:text-base"
              rows="4"
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1.5">{bio.length}/160</p>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold mb-2">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
              placeholder="https://your-website.com"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
              placeholder="City, Country"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditProfile;
