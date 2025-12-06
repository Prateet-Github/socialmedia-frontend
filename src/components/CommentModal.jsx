// src/components/CommentModal.jsx
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchComments, addComment } from "../redux/commentSlice";
import { X, AlertCircle } from "lucide-react";
import { getDiceBearAvatar } from "../utils/dicebear";
import { formatTime } from "../utils/time";

const CommentModal = ({ postId, onClose }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [submitError, setSubmitError] = useState("");
  const listRef = useRef(null);
  
  const { user: currentUser, token, isAuthenticated } = useSelector((state) => state.auth);

  const comments = useSelector((state) => {
    const arr = state.comments.byPostId[postId];
    return arr ? arr : [];
  }, shallowEqual);

  const loading = useSelector(
    (state) => state.comments.loadingByPostId[postId]
  );

  const error = useSelector(
    (state) => state.comments.errorByPostId[postId]
  );

  // fetch comments when modal opens
  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Check authentication
    if (!isAuthenticated || !token) {
      setSubmitError("Please log in to comment");
      return;
    }

    setSubmitError("");

    const res = await dispatch(addComment({ postId, content: text.trim() }));

    if (res.meta.requestStatus === "fulfilled") {
      setText("");

      // scroll to top
      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (res.meta.requestStatus === "rejected") {
      setSubmitError(res.payload?.message || "Failed to post comment");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl flex flex-col max-h-[85vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold text-lg">Comments</h2>
          <button 
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1.5 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* comments list */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-5 py-4"
        >
          {loading && (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-gray-500">Loading comments...</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex items-center gap-2 justify-center py-8 text-red-500">
              <AlertCircle className="size-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && comments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-gray-500 mb-1">No comments yet</p>
              <p className="text-xs text-gray-400">Be the first to comment!</p>
            </div>
          )}

          {!loading && !error && comments.length > 0 && (
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c._id} className="flex gap-3">
                  {/* Avatar */}
                  <img
                    src={c.user?.avatar || getDiceBearAvatar(c.user?.name)}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />

                  {/* Comment content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm truncate">
                        {c.user?.name || "User"}
                      </span>
                      {c.user?.username && (
                        <span className="text-gray-500 text-xs truncate">
                          @{c.user.username}
                        </span>
                      )}
                      <span className="text-gray-400 text-xs shrink-0">
                        {formatTime(c.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {c.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* input section */}
        <div className="border-t border-gray-200 dark:border-gray-800 px-5 py-4">
          {/* Error message for comment submission */}
          {submitError && (
            <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="size-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
            </div>
          )}

          {/* Not authenticated warning */}
          {!isAuthenticated && (
            <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <AlertCircle className="size-4 text-yellow-600 shrink-0" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400">Please log in to comment</p>
            </div>
          )}

          <div className="flex gap-3 items-center">
            {/* Current user avatar */}
            {currentUser && (
              <img
                src={currentUser?.avatar || getDiceBearAvatar(currentUser?.name)}
                alt="your avatar"
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
            )}

            {/* Input field */}
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder={isAuthenticated ? "Add a comment..." : "Log in to comment"}
              disabled={!isAuthenticated}
              className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-full outline-none focus:border-blue-500 dark:focus:border-blue-500 bg-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {/* Post button */}
            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
              disabled={!text.trim() || !isAuthenticated}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;