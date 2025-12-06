import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiceBearAvatar } from "../utils/dicebear";
import { formatTime } from "../utils/time";
import { shortenNumber, formatNumber } from "../utils/numbers";
import { likePost, unlikePost } from "../redux/postSlice";
import { fetchComments } from "../redux/commentSlice";
import { useState, useMemo, useEffect } from "react";
import CommentModal from "./CommentModal.jsx";

const FeedCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initial likes state
  const [localLikes, setLocalLikes] = useState(post.likes);

  // Prefetch comments when card mounts
  useEffect(() => {
    // Only fetch if not already in Redux store
    const commentsInStore = dispatch((_, getState) => {
      return getState().comments.byPostId[post._id];
    });
    
    if (!commentsInStore) {
      dispatch(fetchComments(post._id));
    }
  }, [dispatch, post._id]);

  const comments = useSelector((s) => s.comments.byPostId[post._id]);
  
  // Use Redux comments if available, otherwise fall back to post.comments
  const commentCount = comments?.length ?? post.comments?.length ?? 0;

  const likeCount = localLikes?.length || 0;

  const isLiked = useMemo(
    () => localLikes?.includes(currentUser?._id),
    [localLikes, currentUser]
  );

  // follow your brain — local update first
  const handleLike = () => {
    if (!currentUser) return;

    let updatedLikes;

    if (isLiked) {
      updatedLikes = localLikes.filter((id) => id !== currentUser._id);
      setLocalLikes(updatedLikes);
      dispatch(unlikePost(post._id));
    } else {
      updatedLikes = [...localLikes, currentUser._id];
      setLocalLikes(updatedLikes);
      dispatch(likePost(post._id));
    }
  };

  const goToUser = () => {
    if (!post?.user?.username) return;
    if (currentUser?._id === post.user._id) navigate("/profile");
    else navigate(`/user/${post.user.username}`);
  };

  return (
    <article className="flex p-3 md:p-6 gap-2 md:gap-3 transition-colors border-b border-gray-200 dark:border-gray-800 w-full max-w-2xl">
      {/* Avatar */}
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
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={goToUser}
        >
          <h1 className="font-semibold hover:underline text-sm md:text-base truncate">
            {post?.user?.name}
          </h1>
          <span>•</span>
          <p className="text-gray-600 text-xs md:text-sm shrink-0">
            {formatTime(post.createdAt)}
          </p>
        </div>

        {/* Caption */}
        {post.content && (
          <p className="text-sm md:text-base whitespace-pre-wrap">
            {post.content}
          </p>
        )}

        {/* Image */}
        {post.media?.length > 0 && (
          <div className="border border-gray-600 max-h-140 w-fit overflow-hidden rounded-xl md:rounded-2xl">
            <img src={post.media[0]} className="w-full h-full object-contain" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mx-2">
          {/* LIKE */}
          <div className="flex items-center px-2 py-1.5">
            <button onClick={handleLike}>
              <Heart
                className={`size-5 cursor-pointer hover:text-red-500 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
            <span className="ml-1 text-sm font-medium inline-flex justify-center min-w-[3ch]">
              {shortenNumber(likeCount)}
            </span>
          </div>

          {/* COMMENT */}
          <div
            className="flex items-center px-2 py-1.5 cursor-pointer"
            onClick={() => setShowComments(true)}
          >
            <MessageCircle className="size-5 hover:text-blue-500" />
            <span className="ml-1 text-sm font-medium">
              {formatNumber(commentCount || 0)}
            </span>
          </div>

          {showComments && (
            <CommentModal
              postId={post._id}
              onClose={() => setShowComments(false)}
            />
          )}

          <button>
            <Share2 className="size-5 cursor-pointer hover:text-green-500" />
          </button>

          <button>
            <Bookmark className="size-5 cursor-pointer hover:text-yellow-500" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default FeedCard;