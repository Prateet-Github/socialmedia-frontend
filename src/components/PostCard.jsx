import { X, Image, Smile, MapPin } from "lucide-react";
import { useState } from "react";

const PostCard = ({ onClose }) => {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handlePost = () => {
    // Handle post submission logic here
    console.log("Posting:", { postText, selectedImage });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg md:text-xl font-semibold">Create Post</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-900 p-2 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src="./pfp.jpeg"
              alt="profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm md:text-base">
                Prateet Tiwari
              </h3>
              <p className="text-xs text-gray-400">@prateettiwari</p>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent outline-none resize-none text-sm md:text-base min-h-32 md:min-h-40"
            maxLength={500}
          />

          {/* Image Preview */}
          {selectedImage && (
            <div className="relative mt-4 border border-gray-800 rounded-xl overflow-hidden max-h-96">
              <img
                src={selectedImage}
                alt="preview"
                className="w-full h-full object-contain"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-4">
          {/* Media Options */}
          <div className="flex items-center gap-2 mb-4">
            <label className="cursor-pointer hover:bg-gray-900 p-2 rounded-full transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Image className="size-5 text-blue-500" />
            </label>
            <button className="hover:bg-gray-900 p-2 rounded-full transition-colors">
              <Smile className="size-5 text-yellow-500" />
            </button>
            <button className="hover:bg-gray-900 p-2 rounded-full transition-colors">
              <MapPin className="size-5 text-green-500" />
            </button>
          </div>

          {/* Character Count & Post Button */}
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-gray-400">
              {postText.length}/500
            </span>
            <button
              onClick={handlePost}
              disabled={!postText.trim() && !selectedImage}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
