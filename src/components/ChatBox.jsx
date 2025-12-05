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
import VoiceCallModal from "./VoiceCallModal";
import VideoCallModal from "./VideoCallModal";
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
  const [showVideoCallerModal, setShowVideoCallerModal] = useState(false); // outgoing video
  const [showVideoCalleeModalData, setShowVideoCalleeModalData] =
    useState(null); // incoming video offer data
  const [showVoiceModalOutgoing, setShowVoiceModalOutgoing] = useState(false);
  const [incomingVoiceCall, setIncomingVoiceCall] = useState(null); // incoming voice offer data

  // messages & input
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null); // incoming video offer popup
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

  // --------------------------
  // Socket listeners for messages & video call offers (per chat)
  // --------------------------
  useEffect(() => {
    if (!chat?._id || !currentUser) return;

    socket.emit("join-chat", { chatId: chat._id, userId: currentUser._id });

    const onNewMessage = (msg) => {
      if (!msg) return;
      if (msg.chatId !== chat._id) return;

      setMessages((prev) => {
        const exists = prev.some((m) => m._id === msg._id);
        if (exists) return prev;
        return [...prev, msg];
      });

      setTimeout(scrollToBottom, 50);
    };

    // Video call offer arrives here when server sends it to this user's socket
    const onVideoCallOffer = ({
      offer,
      callerId,
      callerSocketId,
      callerName,
      callerAvatar,
    }) => {
      setIncomingCall({
        offer,
        callerId,
        callerSocketId,
        callerName,
        callerAvatar,
      });
    };

    const onVideoCallEnd = ({ fromSocketId }) => {
      // if popup is showing from same socket remove it
      setIncomingCall((cur) =>
        cur && cur.callerSocketId === fromSocketId ? null : cur
      );
      // if callee modal open for same socket, close it
      setShowVideoCalleeModalData((cur) =>
        cur && cur.callerSocketId === fromSocketId ? null : cur
      );
      // also close outgoing caller modal if it was to that socket
      setShowVideoCallerModal(false);
    };

    socket.on("message:new", onNewMessage);
    socket.on("call:offer", onVideoCallOffer);
    socket.on("call:end", onVideoCallEnd);

    return () => {
      socket.off("message:new", onNewMessage);
      socket.off("call:offer", onVideoCallOffer);
      socket.off("call:end", onVideoCallEnd);
      socket.emit("leave-chat", { chatId: chat._id, userId: currentUser._id });
    };
  }, [chat?._id, currentUser?._id]);

  // --------------------------
  // Socket listeners for voice calls (global)
  // These run once
  // --------------------------
  useEffect(() => {
    // incoming voice call offer (server sends only to the target user's socket)
    const onVoiceOffer = ({
      offer,
      callerId,
      callerName,
      callerAvatar,
      callerSocketId,
    }) => {
      setIncomingVoiceCall({
        offer,
        callerId,
        callerName,
        callerAvatar,
        callerSocketId,
      });
    };

    // caller ended/cancelled -> remove popup / active modal if matches
    const onVoiceEnd = ({ fromSocketId }) => {
      setIncomingVoiceCall((cur) =>
        cur && cur.callerSocketId === fromSocketId ? null : cur
      );
      // close outgoing/incoming voice modal if it's for that socket
      setShowVoiceModalOutgoing((cur) => {
        // if outgoing is open, close it (no easy check of target socket here)
        return false;
      });
    };

    socket.on("voice:offer", onVoiceOffer);
    socket.on("voice:end", onVoiceEnd);

    return () => {
      socket.off("voice:offer", onVoiceOffer);
      socket.off("voice:end", onVoiceEnd);
    };
  }, []);

  // --------------------------
  // Image selection helpers
  // --------------------------
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setIsUp(false);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --------------------------
  // Sending messages / location
  // --------------------------
  const sendMessage = async () => {
    if (!chat?._id) return;
    const text = input?.trim();
    const hasImage = selectedImage;
    if (!text && !hasImage) return;

    setUploading(true);

    try {
      let mediaUrls = [];
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

      const tempMessage = {
        _id: `temp-${Date.now()}`,
        chatId: chat._id,
        sender: {
          _id: currentUser._id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        text: text || "",
        media:
          mediaUrls.length > 0 ? mediaUrls : imagePreview ? [imagePreview] : [],
        createdAt: new Date().toISOString(),
        pending: true,
      };

      setMessages((m) => [...m, tempMessage]);
      setInput("");
      removeImage();
      setTimeout(scrollToBottom, 50);

      const res = await axios.post(
        `${API}/messages`,
        { chatId: chat._id, text: text || "", media: mediaUrls },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const saved = res.data;

      setMessages((prev) =>
        prev.map((m) => (m._id === tempMessage._id ? saved : m))
      );

      // broadcast so other clients receive it
      socket.emit("message:send", { message: saved });
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Failed to send message. Please try again.");
      setMessages((prev) => prev.filter((m) => !m._id.startsWith("temp-")));
    } finally {
      setUploading(false);
    }
  };

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
          setMessages((prev) =>
            prev.map((m) => (m._id === tempMessage._id ? saved : m))
          );
          socket.emit("message:send", { message: saved });
        } catch (err) {
          console.error("Failed to send location:", err);
          alert("Failed to send location");
          setMessages((prev) => prev.filter((m) => !m._id.startsWith("temp-")));
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

  // simple click handlers
  const handleClick = () => navigate(`/user/${otherUser?.username}`);
  const handleFileClick = () => {
    setIsUp(false);
    alert("File upload coming soon!");
  };
  const handlePhotoClick = () => {
    setIsUp(false);
    fileInputRef.current?.click();
  };
  const handleLocationClick = () => sendLocation();

  // ---------- Incoming Video Call popup handlers ----------
  const acceptIncomingVideoCall = () => {
    if (!incomingCall) return;
    // open callee modal with incomingCall data
    setShowVideoCalleeModalData(incomingCall);
    // keep the incomingCall state; modal will clear it on close
    // optionally hide the small popup
    setIncomingCall(null);
  };

  const declineIncomingVideoCall = () => {
    if (!incomingCall) return;
    socket.emit("call:end", { toSocketId: incomingCall.callerSocketId });
    setIncomingCall(null);
  };

  // ---------- Incoming Voice Call popup handlers ----------
  const acceptVoiceCall = () => {
    if (!incomingVoiceCall) return;
    // Open the incoming voice modal and pass offer and caller socket id
    setShowVoiceModalOutgoing(true); // reusing outgoing flag to show the modal component
    // don't clear incomingVoiceCall — pass it into modal as prop; modal's onClose will clear
  };

  const rejectVoiceCall = () => {
    if (!incomingVoiceCall) return;
    socket.emit("voice:end", { toSocketId: incomingVoiceCall.callerSocketId });
    setIncomingVoiceCall(null);
  };

  // ---------- Render ----------
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

      {/* Header */}
      <div className="border-b border-gray-300 dark:border-gray-800 p-3 md:p-4 flex justify-between items-center sticky top-0 z-10 bg-white dark:bg-black">
        <div className="flex gap-3 md:gap-4 items-center">
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
          {/* Video call (outgoing) */}
          <button
            onClick={() => setShowVideoCallerModal(true)}
            title="Video Call"
            className="cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 transition-colors"
          >
            <Camera className="size-5 md:size-6" />
          </button>

          {/* Outgoing video modal */}
          {showVideoCallerModal && !showVideoCalleeModalData && (
            <VideoCallModal
              onClose={() => {
                setShowVideoCallerModal(false);
                setIncomingCall(null);
              }}
              callerId={currentUser._id}
              calleeId={otherUser?._id}
              isCaller={true}
            />
          )}

          {/* Voice Call button */}
          <button
            onClick={() => setShowVoiceModalOutgoing(true)}
            title="Voice Call"
            className="cursor-pointer dark:hover:text-gray-300 hover:text-gray-500 transition-colors"
          >
            <PhoneCall className="size-5 md:size-6" />
          </button>

          {/* Outgoing voice modal */}
          {showVoiceModalOutgoing && !incomingVoiceCall && (
            <VoiceCallModal
              onClose={() => {
                setShowVoiceModalOutgoing(false);
                setIncomingVoiceCall(null);
              }}
              callerId={currentUser._id}
              calleeId={otherUser?._id}
              isCaller={true}
            />
          )}

          {/* Incoming voice accepted (callee modal) */}
          {incomingVoiceCall && showVoiceModalOutgoing && (
            <VoiceCallModal
              onClose={() => {
                setShowVoiceModalOutgoing(false);
                setIncomingVoiceCall(null);
              }}
              callerId={incomingVoiceCall.callerId}
              calleeId={currentUser._id}
              isCaller={false}
              incomingOffer={incomingVoiceCall.offer}
              incomingCallerSocketId={incomingVoiceCall.callerSocketId}
              callerName={incomingVoiceCall.callerName}
              callerAvatar={incomingVoiceCall.callerAvatar}
            />
          )}
        </div>
      </div>

      {/* Messages area */}
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
                } p-2.5 md:p-3 max-w-[75%] md:max-w-xs wrap-break-words`}
              >
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

                {m.text && <p className="text-sm md:text-base">{m.text}</p>}

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

      {/* Input */}
      <div className="border-t border-gray-300 dark:border-gray-800 relative p-3 md:p-4 flex gap-2 md:gap-4 items-center bg-white dark:bg-black">
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
              <div className="border-t border-gray-300 dark:border-gray-800" />
              <button
                onClick={handlePhotoClick}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
              >
                <Image className="size-5 text-blue-500" />
                <span className="font-medium">Photo & Video</span>
              </button>
              <div className="border-t border-gray-300 dark:border-gray-800" />
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

      {/* ---------- INCOMING VIDEO CALL POPUP (ACCEPT / DECLINE) ---------- */}
      {incomingCall && !showVideoCalleeModalData && (
        <div className="fixed right-4 bottom-24 z-50 bg-white dark:bg-gray-900 border rounded-xl shadow-lg p-3 flex items-center gap-3 w-72">
          <div className="flex-1">
            <div className="font-semibold">
              {incomingCall.callerName || "Unknown"}
            </div>
            <div className="text-xs text-gray-500">is calling you</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={acceptIncomingVideoCall}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
            >
              Accept
            </button>
            <button
              onClick={declineIncomingVideoCall}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {/* ---------- CALEE VIDEO MODAL: show when accepted ---------- */}
      {showVideoCalleeModalData && (
        <VideoCallModal
          onClose={() => {
            setShowVideoCalleeModalData(null);
            setIncomingCall(null);
            setShowVideoCallerModal(false);
          }}
          isCaller={false}
          callerId={showVideoCalleeModalData.callerId}
          calleeId={currentUser._id}
          callerSocketId={showVideoCalleeModalData.callerSocketId}
          offer={showVideoCalleeModalData.offer}
        />
      )}

      {/* ---------- INCOMING VOICE CALL POPUP ---------- */}
      {incomingVoiceCall && !showVoiceModalOutgoing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-[320px] text-center">
            <img
              src={
                incomingVoiceCall.callerAvatar ||
                getDiceBearAvatar(incomingVoiceCall.callerName)
              }
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold">
              {incomingVoiceCall.callerName}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Incoming Voice Call…
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={rejectVoiceCall}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full"
              >
                <X size={20} />
              </button>
              <button
                onClick={acceptVoiceCall}
                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full"
              >
                <PhoneCall size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ChatBox;
