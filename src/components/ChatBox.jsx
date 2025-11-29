import {
  Camera,
  PhoneCall,
  PlusCircle,
  SendHorizonal,
  ArrowLeft,
  File,
  Image,
  MapPin,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import CallModal from "./VideoCallModal";
import VoiceCallModal from "./VoiceCallModal";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
  const [isUp, setIsUp] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [voiceCall, setVoiceCall] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUp(false);
      }
    }

    if (isUp) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUp]);

  const handleClick = () => {
    navigate("/profile");
  };

  const handleFileClick = () => {
    setIsUp(false);
    navigate("/profile");
  };

  const handlePhotoClick = () => {
    setIsUp(false);
    navigate("/profile");
  };

  const handleLocationClick = () => {
    setIsUp(false);
    navigate("/profile");
  };

  return (
    <main className="flex flex-col h-screen">
      {/* Header - fixed to top */}
      <div className="border-b  border-gray-300 dark:border-gray-800 p-3 md:p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex gap-3 md:gap-4 items-center">
          {/* Back button for mobile */}
          <button className="md:hidden">
            <ArrowLeft className="size-5" />
          </button>
          <img
            src="./pfp.jpeg"
            alt="pfp"
            className="h-9 cursor-pointer hover:opacity-90 w-9 md:h-10 md:w-10 object-cover rounded-full border"
            onClick={handleClick}
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm md:text-base">
              Prateet Tiwari
            </span>
            <span className="text-xs text-gray-400">Active now</span>
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
        {/* Received message */}
        <div className="flex">
          <div className="dark:bg-gray-800 bg-gray-200 p-2.5 md:p-3 rounded-2xl rounded-tl-sm max-w-[75%] md:max-w-xs">
            <p className="text-sm md:text-base">
              Hey Prateet! How's it going? Just wanted to check in and see how
              you're doing.
            </p>
            <span className="text-xs text-gray-400 mt-1 block">10:30 AM</span>
          </div>
        </div>

        {/* Sent message */}
        <div className="flex justify-end">
          <div className="bg-blue-600 p-2.5 md:p-3 rounded-2xl rounded-tr-sm max-w-[75%] md:max-w-xs text-white">
            <p className="text-sm md:text-base">
              Hey! I'm doing great, thanks for asking!
            </p>
            <span className="text-xs text-blue-200 mt-1 block">10:32 AM</span>
          </div>
        </div>

        <div className="flex">
          <div className="dark:bg-gray-800 bg-gray-200 p-2.5 md:p-3 rounded-2xl rounded-tl-sm max-w-[75%] md:max-w-xs">
            <p className="text-sm md:text-base">
              That's awesome! What have you been up to lately?
            </p>
            <span className="text-xs text-gray-400 mt-1 block">10:33 AM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-blue-600 p-2.5 md:p-3 rounded-2xl rounded-tr-sm max-w-[75%] md:max-w-xs text-white">
            <p className="text-sm md:text-base">
              Working on some cool projects! Building a social media app.
            </p>
            <span className="text-xs text-blue-200 mt-1 block">10:35 AM</span>
          </div>
        </div>

        <div className="flex">
          <div className="dark:bg-gray-800 bg-gray-200 p-2.5 md:p-3 rounded-2xl rounded-tl-sm max-w-[75%] md:max-w-xs">
            <p className="text-sm md:text-base">
              That sounds interesting! Would love to hear more about it.
            </p>
            <span className="text-xs text-gray-400 mt-1 block">10:36 AM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-blue-600 p-2.5 md:p-3 rounded-2xl rounded-tr-sm max-w-[75%] md:max-w-xs text-white">
            <p className="text-sm md:text-base">Sure! Let's catch up soon 🚀</p>
            <span className="text-xs text-blue-200 mt-1 block">10:37 AM</span>
          </div>
        </div>
      </div>

      {/* Input - fixed to bottom */}
      <div className="border-t  border-gray-300 dark:border-gray-800 relative p-3 md:p-4 flex gap-2 md:gap-4 items-center">
        {/* FIXED: Wrapped button and dropdown together */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            onClick={() => setIsUp(!isUp)}
            className="hover:text-gray-300 transition-colors"
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
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 md:p-2.5 px-4 border border-gray-700 rounded-full outline-none focus:border-blue-500 transition-colors text-sm md:text-base"
        />
        <button className="shrink-0 bg-blue-600 hover:bg-blue-700 p-2 md:p-2.5 cursor-pointer rounded-full transition-colors">
          <SendHorizonal className="size-4 md:size-5" />
        </button>
      </div>
    </main>
  );
};

export default ChatBox;
