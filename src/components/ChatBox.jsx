// src/components/ChatBox.jsx
import {
  Camera,
  PhoneCall,
  PlusCircle,
  SendHorizonal,
  ArrowLeft,
  File,
  Image,
  MapPin,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CallModal from "./VideoCallModal";
import VoiceCallModal from "./VoiceCallModal";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import { socket } from "../socket";
import axios from "axios";
import { useSelector } from "react-redux";
import { getDiceBearAvatar } from "../utils/dicebear";

const API = "http://localhost:5001/api";

const ChatBox = ({ chat }) => {
  // state variables
  const [isUp, setIsUp] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [voiceCall, setVoiceCall] = useState(false);

  // messages & input
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // hooks
  const navigate = useNavigate();
  const dropdownRef = useClickOutside(() => setIsUp(false));
  const { user: currentUser, token } = useSelector((state) => state.auth);

  // helpers
  const otherUser =
    chat?.users?.find((u) => u._id !== currentUser?._id) || null;

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // load messages for chat
  useEffect(() => {
    if (!chat?._id) {
      setMessages([]);
      return;
    }

    let mounted = true;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API}/messages/${chat._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!mounted) return;
        setMessages(res.data || []);
        setTimeout(scrollToBottom, 50);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();

    return () => {
      mounted = false;
    };
  }, [chat?._id, token]);

  // socket: join chat room and listen for incoming messages
  useEffect(() => {
    if (!chat?._id || !currentUser) return;

    socket.emit("join-chat", { chatId: chat._id, userId: currentUser._id });

    const onNew = (msg) => {
      if (!msg) return;

      // Only messages for this chat
      if (msg.chatId !== chat._id) return;

      // Check if message already exists
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === msg._id);
        if (exists) return prev;
        return [...prev, msg];
      });

      setTimeout(scrollToBottom, 50);
    };

    socket.on("message:new", onNew);

    return () => {
      socket.off("message:new", onNew);
      socket.emit("leave-chat", { chatId: chat._id, userId: currentUser._id });
    };
  }, [chat?._id, currentUser?._id]);

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setIsUp(false);
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Send text or image message
  const sendMessage = async () => {
    if (!chat?._id) return;

    const text = input?.trim();
    const hasImage = selectedImage;

    if (!text && !hasImage) return;

    setUploading(true);

    try {
      let mediaUrls = [];

      // Upload image if selected
      if (hasImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadRes = await axios.post(
          `${API}/messages/upload-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        mediaUrls.push(uploadRes.data.url);
      }

      // Create optimistic message
      const tempMessage = {
        _id: `temp-${Date.now()}`,
        chatId: chat._id,
        sender: {
          _id: currentUser._id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        text: text || "",
        media: mediaUrls.length > 0 ? mediaUrls : (imagePreview ? [imagePreview] : []),
        createdAt: new Date().toISOString(),
        pending: true,
      };

      setMessages((m) => [...m, tempMessage]);
      setInput("");
      removeImage();
      setTimeout(scrollToBottom, 50);

      // Send message to backend
      const res = await axios.post(
        `${API}/messages`,
        {
          chatId: chat._id,
          text: text || "",
          media: mediaUrls,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const saved = res.data;

      // Replace temp message with saved message
      setMessages((prev) =>
        prev.map((m) => (m._id === tempMessage._id ? saved : m))
      );

      // Emit via socket
      socket.emit("message:send", { message: saved });
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Failed to send message. Please try again.");
      // Remove optimistic message on failure
      setMessages((prev) =>
        prev.filter((m) => !m._id.startsWith("temp-"))
      );
    } finally {
      setUploading(false);
    }
  };

  // Send location
  const sendLocation = async () => {
    if (!chat?._id) return;

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsUp(false);
    setUploading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        try {
          // Create optimistic message
          const tempMessage = {
            _id: `temp-${Date.now()}`,
            chatId: chat._id,
            sender: {
              _id: currentUser._id,
              name: currentUser.name,
              avatar: currentUser.avatar,
            },
            text: `📍 Location: ${locationUrl}`,
            media: [],
            location: { latitude, longitude },
            createdAt: new Date().toISOString(),
            pending: true,
          };

          setMessages((m) => [...m, tempMessage]);
          setTimeout(scrollToBottom, 50);

          // Send to backend
          const res = await axios.post(
            `${API}/messages`,
            {
              chatId: chat._id,
              text: `📍 Location: ${locationUrl}`,
              location: { latitude, longitude },
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const saved = res.data;

          // Replace temp with saved
          setMessages((prev) =>
            prev.map((m) => (m._id === tempMessage._id ? saved : m))
          );

          // Emit via socket
          socket.emit("message:send", { message: saved });
        } catch (err) {
          console.error("Failed to send location:", err);
          alert("Failed to send location");
          setMessages((prev) =>
            prev.filter((m) => !m._id.startsWith("temp-"))
          );
        } finally {
          setUploading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get your location. Please enable location access.");
        setUploading(false);
      }
    );
  };

  // Enter key handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Click handlers
  const handleClick = () => {
    navigate(`/user/${otherUser?.username}`);
  };

  const handleFileClick = () => {
    setIsUp(false);
    // You can implement file upload here later
    alert("File upload coming soon!");
  };

  const handlePhotoClick = () => {
    setIsUp(false);
    fileInputRef.current?.click();
  };

  const handleLocationClick = () => {
    sendLocation();
  };

  return (
    <main className="flex flex-col h-screen">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Header - fixed to top */}
      <div className="border-b border-gray-300 dark:border-gray-800 p-3 md:p-4 flex justify-between items-center sticky top-0 z-10 bg-white dark:bg-black">
        <div className="flex gap-3 md:gap-4 items-center">
          {/* Back button for mobile */}
          <button className="md:hidden" onClick={() => navigate("/messages")}>
            <ArrowLeft className="size-5" />
          </button>
          <img
            src={otherUser?.avatar || getDiceBearAvatar(otherUser?.name)}
            alt="pfp"
            className="h-9 cursor-pointer hover:opacity-90 w-9 md:h-10 md:w-10 object-cover rounded-full border"
            onClick={handleClick}
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm md:text-base">
              {otherUser?.name || "No chat selected"}
            </span>
            <span className="text-xs text-gray-400">
              {otherUser ? "Active now" : ""}
            </span>
          </div>
        </div>
        <div className="flex gap-3 md:gap-4">
          <button
            onClick={() => setShowCall(true)}
            title="Video Call"
            className="cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 transition-colors"
          >
            <Camera className="size-5 md:size-6" />
          </button>
          {showCall && <CallModal onClose={() => setShowCall(false)} />}
          <button
            onClick={() => setVoiceCall(true)}
            title="Voice Call"
            className="cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 transition-colors"
          >
            <PhoneCall className="size-5 md:size-6" />
          </button>
          {voiceCall && <VoiceCallModal onClose={() => setVoiceCall(false)} />}
        </div>
      </div>

      {/* Messages area - scrollable */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No messages yet. Say hi 👋
          </div>
        )}

        {messages.map((m) => {
          const mine = m.sender?._id === currentUser?._id;
          return (
            <div key={m._id} className={mine ? "flex justify-end" : "flex"}>
              <div
                className={`${
                  mine
                    ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm"
                    : "dark:bg-gray-800 bg-gray-200 rounded-2xl rounded-tl-sm"
                } p-2.5 md:p-3 max-w-[75%] md:max-w-xs break-words`}
              >
                {/* Images from media array */}
                {m.media && m.media.length > 0 && (
                  <div className="space-y-2 mb-2">
                    {m.media.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt="sent"
                        className="rounded-lg max-w-full cursor-pointer hover:opacity-90"
                        onClick={() => window.open(url, "_blank")}
                      />
                    ))}
                  </div>
                )}

                {/* Text */}
                {m.text && <p className="text-sm md:text-base">{m.text}</p>}

                {/* Timestamp */}
                <span
                  className={`${
                    mine ? "text-blue-200" : "text-gray-400"
                  } text-xs mt-1 block`}
                >
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {m.pending && " • Sending..."}
                  {m.failed && " • Failed"}
                </span>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="border-t border-gray-300 dark:border-gray-800 p-3 bg-white dark:bg-black">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="preview"
              className="h-20 w-20 object-cover rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Input - fixed to bottom */}
      <div className="border-t border-gray-300 dark:border-gray-800 relative p-3 md:p-4 flex gap-2 md:gap-4 items-center bg-white dark:bg-black">
        {/* Wrapped button and dropdown together */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            onClick={() => setIsUp(!isUp)}
            disabled={uploading}
            className="hover:text-gray-300 transition-colors disabled:opacity-50"
          >
            <PlusCircle className="size-5 md:size-6 dark:hover:text-gray-300 hover:text-gray-500 cursor-pointer" />
          </button>

          {isUp && (
            <div className="absolute bg-white dark:bg-black bottom-12 left-0 border border-gray-300 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden w-44 z-50">
              <button
                onClick={handleFileClick}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
              >
                <File className="size-5 text-blue-500" />
                <span className="font-medium">File</span>
              </button>
              <div className="border-t border-gray-300 dark:border-gray-800"></div>
              <button
                onClick={handlePhotoClick}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
              >
                <Image className="size-5 text-blue-500" />
                <span className="font-medium">Photo & Video</span>
              </button>
              <div className="border-t border-gray-300 dark:border-gray-800"></div>
              <button
                onClick={handleLocationClick}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
              >
                <MapPin className="size-5 text-blue-500" />
                <span className="font-medium">Location</span>
              </button>
            </div>
          )}
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={uploading}
          type="text"
          placeholder={uploading ? "Uploading..." : "Type a message..."}
          className="flex-1 p-2 md:p-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-full outline-none focus:border-blue-500 transition-colors text-sm md:text-base bg-transparent disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={(!input.trim() && !selectedImage) || uploading}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed p-2 md:p-2.5 cursor-pointer rounded-full transition-colors"
        >
          <SendHorizonal className="size-4 md:size-5" />
        </button>
      </div>
    </main>
  );
};

export default ChatBox;