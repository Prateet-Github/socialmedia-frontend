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

  // Local form state initialized from Redux user
  const [profileImage, setProfileImage] = useState(user?.avatar || "./pfp.jpeg");
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [website, setWebsite] = useState(user?.website || "");
  const [location, setLocation] = useState(user?.location || "");

  // If user loads later (e.g. refresh + rehydration), sync form
  useEffect(() => {
    if (user) {
      setProfileImage(user.avatar || "./pfp.jpeg");
      setName(user.name || "");
      setBio(user.bio || "");
      setWebsite(user.website || "");
      setLocation(user.location || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // This will be a base64 data URL for now
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!user) return;

    // Only send changed fields (optional but nice)
    const updates = {};

    if (name !== user.name) updates.name = name;
    if (bio !== user.bio) updates.bio = bio;
    if (website !== user.website) updates.website = website;
    if (location !== user.location) updates.location = location;
    if (profileImage !== (user.avatar || "./pfp.jpeg")) {
      updates.avatar = profileImage; // for now this is base64 or URL
    }

    if (Object.keys(updates).length === 0) {
      toast("Nothing to update");
      return;
    }

    const t = toast.loading("Saving profile...");

    dispatch(updateProfile(updates)).then((res) => {
      toast.dismiss(t);

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Profile updated successfully!");
        navigate("/profile");
      } else {
        toast.error(res.payload || "Failed to update profile");
      }
    });
  };

  // If no user (somehow), you can redirect back
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

        {/* Form Fields */}
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

          {/* Username (Read-only) */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user?.username || ""}
              disabled
              className="w-full border border-gray-700 rounded-lg p-3 outline-none text-sm md:text-base text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Username cannot be changed
            </p>
          </div>

          {/* Bio Input */}
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors resize-none text-sm md:text-base"
              rows="4"
              placeholder="Tell us about yourself"
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1.5">{bio.length}/160</p>
          </div>

          {/* Website Input */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="website"
            >
              Website
            </label>
            <input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors text-sm md:text-base"
              placeholder="https://your-website.com"
            />
          </div>

          {/* Location Input */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors text-sm md:text-base"
              placeholder="City, Country"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditProfile;