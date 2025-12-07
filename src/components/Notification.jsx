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

  useEffect(() => {
    dispatch(markAllRead());
  }, [dispatch]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Notifications</h1>

      {loading && <p className="text-gray-500">Loading…</p>}

      {!loading && items.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No notifications yet
        </p>
      )}

      <div className="space-y-2">
        {items.map((n) => {
          const avatar =
            n.fromUser?.avatar || getDiceBearAvatar(n.fromUser?.name);

          return (
            <div
              key={n._id}
              onClick={() => {
                if (n.post?._id) navigate(`/post/${n.post._id}`);
              }}
              className={`flex gap-3 items-center p-3 rounded-xl border cursor-pointer 
              hover:bg-gray-100 dark:hover:bg-gray-800 transition
              ${
                !n.read
                  ? "border-blue-400"
                  : "border-gray-300 dark:border-gray-700"
              }
            `}
            >
              {/* avatar */}
              <img
                src={avatar}
                alt="pfp"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex flex-col flex-1">
                <p className="text-sm leading-tight">
                  <span className="font-semibold mr-1">
                    {n.fromUser?.username}
                  </span>

                  {n.type === "like" && "liked your post"}
                  {n.type === "comment" && "commented on your post"}
                  {n.type === "follow" && "followed you"}
                </p>

                {/* post thumbnail if any */}
                {n.post?.media?.[0] && (
                  <img
                    src={n.post.media[0]}
                    className="w-14 h-14 rounded-lg object-cover mt-2"
                  />
                )}

                <span className="text-xs text-gray-500">
                  {formatTime(n.createdAt)}
                </span>
              </div>

              {/* unread indicator */}
              {!n.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
