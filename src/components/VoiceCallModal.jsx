import { X, Mic, MicOff, Phone, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function VoiceCallModal({ onClose }) {
  // state variables
  const [micOn, setMicOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  // JSX
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
      <div className="relative w-[350px] bg-gray-900 text-white rounded-2xl p-8 text-center flex flex-col items-center gap-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X size={22} />
        </button>

        {/* Profile / Caller UI */}
        <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-xl font-semibold">
          U
        </div>

        <div>
          <h2 className="text-lg font-semibold">Calling Username...</h2>
          <p className="text-sm text-white/60 mt-1">00:12</p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6">
          {/* Mic Toggle */}
          <button
            className={`p-4 rounded-full transition ${
              micOn ? "bg-white/20" : "bg-red-600"
            }`}
            onClick={() => setMicOn(!micOn)}
          >
            {micOn ? <Mic size={22} /> : <MicOff size={22} />}
          </button>

          {/* Speaker Toggle */}
          <button
            className={`p-4 rounded-full transition ${
              speakerOn ? "bg-white/20" : "bg-red-600"
            }`}
            onClick={() => setSpeakerOn(!speakerOn)}
          >
            {speakerOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </button>

          {/* End Call */}
          <button
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition"
            onClick={onClose}
          >
            <Phone size={22} className="-rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
}
