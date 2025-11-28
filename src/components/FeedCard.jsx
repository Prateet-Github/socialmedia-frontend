import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeedCard = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="flex p-3 md:p-6 gap-2 md:gap-3 transition-colors">
      {/* Profile Picture */}
      <div className="shrink-0">
        <img
          src="/pfp.jpeg"
          alt="profile"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 md:gap-4 w-full min-w-0">
        {/* Username + Time */}
        <div className="flex items-center gap-2">
          <h1
            onClick={() => navigate("/profile")}
            className="font-semibold hover:underline cursor-pointer text-sm md:text-base truncate"
          >
            Prateet Tiwari
          </h1>
          <span className="dark:text-gray-400 text-gray-700 text-xs md:text-sm">
            •
          </span>
          <p className="dark:text-gray-400 text-gray-700 text-xs md:text-sm shrink-0">
            2h
          </p>
        </div>

        {/* Text */}
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          So, there is a free and open-source alternative to Netflix available -
          it's known as Stremio.
        </p>

        {/* Image */}
        {/* Image */}
        <div className="border border-gray-600 max-h-140 w-fit overflow-hidden rounded-xl md:rounded-2xl">
          <img
            src="/pfp.jpeg"
            className="w-full h-full object-contain cursor-pointer hover:opacity-95 transition-opacity"
            alt="post content"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mx-2">
          <div className="flex items-center px-2 py-1.5 rounded-lg transition-colors group">
            <button
              onClick={() => setLiked(!liked)}
              title={liked ? "Unlike" : "Like"}
            >
              <Heart
                className={`size-5 cursor-pointer hover:text-red-500 ${
                  liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
            <span className="ml-1 text-sm font-medium inline-flex justify-center min-w-[3ch]">
              {liked ? 101 : 100}
            </span>
          </div>

          <div className="flex items-center px-2 py-1.5 rounded-lg transition-colors group">
            <button title="Comment">
              <MessageCircle className="size-5 cursor-pointer hover:text-blue-500" />
            </button>
            <span className="ml-1 text-sm font-medium inline-flex justify-center min-w-[3ch]">
              20
            </span>
          </div>

          <div className="flex items-center px-2 py-1.5 rounded-lg  transition-colors group">
            <button title="Share">
              <Share2 className="size-5 cursor-pointer hover:text-green-500" />
            </button>
            <span className="ml-1 text-sm font-medium inline-flex justify-center min-w-[3ch]">
              10
            </span>
          </div>

          <div className="flex items-center px-2 py-1.5 rounded-lg  transition-colors group">
            <button
              onClick={() => setSaved(!saved)}
              title={saved ? "Unsave" : "Save"}
            >
              <Bookmark
                className={`size-5 cursor-pointer hover:text-yellow-500 ${
                  saved ? "fill-yellow-500 text-yellow-500" : ""
                }`}
              />
            </button>
            <span className="ml-1 text-sm font-medium inline-flex justify-center min-w-[3ch]">
              {saved ? 32 : 31}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedCard;
