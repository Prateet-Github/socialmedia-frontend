import { useSelector } from "react-redux";
import { getDiceBearAvatar } from "../utils/dicebear";

const Chats = ({ chat, onClick }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  // Find other user in the chat
  const partner = chat.users.find((u) => u._id !== currentUser._id);

  return (
    <article
      onClick={onClick}
      className="flex gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <img
        src={partner?.avatar || getDiceBearAvatar(partner?.name)}
        className="h-12 w-12 rounded-full object-cover border"
      />

      <div className="flex-1">
        <div className="flex justify-between">
          <h1 className="font-semibold">{partner?.name}</h1>
          <span className="text-xs text-gray-500">
            {chat.lastMessage?.createdAt
              ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>
        </div>

        <p className="text-sm text-gray-400 truncate">
          {chat.lastMessage?.text || "No messages yet"}
        </p>
      </div>
    </article>
  );
};

export default Chats;