import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { getDiceBearAvatar } from "../utils/dicebear";

const FeedCard = ({ post }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // 👇 logged-in user
  const { user: currentUser } = useSelector((state) => state.auth);

  const isOwnPost =
    currentUser && post?.user?._id &&
    post.user._id.toString() === currentUser._id.toString();

  const goToUser = () => {
    if (!post?.user?.username) return;

    if (isOwnPost) {
      // 👇 your own profile
      navigate("/profile");
    } else {
      // 👇 other user's public profile
      navigate(`/user/${post.user.username}`);
    }
  };

  return (
    <article className="flex p-3 md:p-6 gap-2 md:gap-3 transition-colors border-b border-gray-200 dark:border-gray-800 w-full max-w-2xl">
      {/* Profile Picture */}
      <div className="shrink-0">
        <img
          src={post?.user?.avatar || getDiceBearAvatar(post?.user?.name)}
          alt="pfp"
          onClick={goToUser}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 md:gap-4 w-full min-w-0">
        {/* Username + Time */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={goToUser}>
          <h1 className="font-semibold hover:underline text-sm md:text-base truncate">
            {post?.user?.name || "Unknown User"}
          </h1>
          <span className="text-gray-600 text-xs md:text-sm">•</span>
          <p className="text-gray-600 text-xs md:text-sm shrink-0">
            {moment(post.createdAt).fromNow()}
          </p>
        </div>

        {/* Text */}
        {post.content && (
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        )}

        {/* Image */}
        {post.media?.length > 0 && (
          <div className="border border-gray-600 max-h-140 w-fit overflow-hidden rounded-xl md:rounded-2xl">
            <img
              src={post.media[0]}
              className="w-full h-full object-contain cursor-pointer hover:opacity-95 transition-opacity"
            />
          </div>
        )}

        {/* Action Buttons (same as before) */}
        <div className="flex items-center justify-between mx-2">
          {/* LIKE */}
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
              {post.likes?.length || 0}
            </span>
          </div>

          {/* COMMENT */}
          <div className="flex items-center px-2 py-1.5 rounded-lg transition-colors group">
            <button title="Comment">
              <MessageCircle className="size-5 cursor-pointer hover:text-blue-500" />
            </button>
            <span className="ml-1 text-sm font-medium inline-flex justify-center min-w-[3ch]">
              {post.comments?.length || 0}
            </span>
          </div>

          {/* SHARE */}
          <div className="flex items-center px-2 py-1.5 rounded-lg transition-colors group">
            <button title="Share">
              <Share2 className="size-5 cursor-pointer hover:text-green-500" />
            </button>
          </div>

          {/* SAVE */}
          <div className="flex items-center px-2 py-1.5 rounded-lg transition-colors group">
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
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedCard;