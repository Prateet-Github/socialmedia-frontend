import { X, Mic, MicOff, Video, VideoOff, Phone } from "lucide-react";
import { useState } from "react";

export default function CallModal({ onClose }) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
      {/* Main Call Box */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Video Placeholder */}
        <div className="w-[80%] h-[70%] bg-gray-800 rounded-xl flex items-center justify-center text-white">
          <p className="opacity-70">Video Stream Here</p>
        </div>

        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <X size={22} />
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-10 flex gap-6">
          {/* Mic */}
          <button
            className={`p-4 rounded-full transition ${
              micOn ? "bg-white/20 text-white" : "bg-red-600 text-white"
            }`}
            onClick={() => setMicOn(!micOn)}
          >
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          {/* Camera */}
          <button
            className={`p-4 rounded-full transition ${
              camOn ? "bg-white/20 text-white" : "bg-red-600 text-white"
            }`}
            onClick={() => setCamOn(!camOn)}
          >
            {camOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          {/* End Call */}
          <button
            className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
            onClick={onClose}
          >
            <Phone size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
