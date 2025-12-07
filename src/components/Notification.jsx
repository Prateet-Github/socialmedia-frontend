import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { markAllRead } from "../redux/notificationSlice";
import { formatTime } from "../utils/time";
import { useNavigate } from "react-router-dom";
import { getDiceBearAvatar } from "../utils/dicebear";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((s) => s.notifications);
  const { user: currentUser } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(markAllRead());
  }, [dispatch]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return (
          <svg
            className="w-5 h-5 text-red-500 fill-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case "comment":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        );
      case "follow":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getNotificationText = (type) => {
    switch (type) {
      case "like":
        return "liked your post";
      case "comment":
        return "commented on your post";
      case "follow":
        return "started following you";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Notifications
          </h1>
          {!loading && items.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {items.length} notification{items.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading notifications...
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-gray-600 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              No notifications yet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm">
              When someone likes, comments, or follows you, you'll see it here
            </p>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-2">
          {items.map((n) => {
            const avatar =
              n.fromUser?.avatar || getDiceBearAvatar(n.fromUser?.name);

            return (
              <div
                key={n._id}
                onClick={() => {
                  if (n.post?._id) {
                    if (n.type === "comment" && n.comment?._id) {
                      navigate(
                        `/profile/post/${n.post._id}?commentId=${n.comment._id}`
                      );
                    } else {
                      navigate(`/profile/post/${n.post._id}`);
                    }
                    return;
                  }

                  if (n.fromUser?.username) {
                    navigate(`/user/${n.fromUser?.username}`);
                  }
                }}
                className={`
                  relative flex gap-3 items-start p-4 rounded-xl cursor-pointer
                  transition-all duration-200 group
                  bg-white dark:bg-black
                  hover:bg-black/10 dark:hover:bg-white/10
                  border border-gray-200 dark:border-gray-800
                  ${!n.read ? "border-l-4 border-l-blue-500" : ""}
                `}
              >
                {/* Avatar with Icon Badge */}
                <div className="relative flex-shrink-0">
                  <img
                    src={avatar}
                    alt={n.fromUser?.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-black"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-black rounded-full p-1 ring-2 ring-white dark:ring-black">
                    {getNotificationIcon(n.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm leading-relaxed text-black dark:text-white">
                      <span className="font-semibold hover:underline">
                        {n.fromUser?.username}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        {getNotificationText(n.type)}
                      </span>
                    </p>
                    {!n.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {formatTime(n.createdAt)}
                  </p>

                  {/* Post Thumbnail */}
                  {n.post?.media?.[0] && (
                    <div className="mt-2">
                      <img
                        src={n.post.media[0]}
                        alt="Post thumbnail"
                        className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-800 group-hover:border-gray-300 dark:group-hover:border-gray-700 transition-colors"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notification;
