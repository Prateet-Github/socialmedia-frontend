import { X, Mic, MicOff, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

export default function VoiceCallModal({
  onClose,
  callerId,
  calleeId,
  isCaller,
  incomingOffer,
  incomingCallerSocketId,
  callerName,
  callerAvatar,
}) {
  const peerRef = useRef(null);
  const localStream = useRef(null);
  const remoteSocketId = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [callStarted, setCallStarted] = useState(false);
  const [timer, setTimer] = useState(0);

  // ---------------- TIMER ----------------
  useEffect(() => {
    let interval;
    if (callStarted) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callStarted]);

  const formatTime = (sec) =>
    new Date(sec * 1000).toISOString().substring(14, 19);

  // ---------------- CREATE PEER ----------------
  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });

    localStream.current.getTracks().forEach((track) => {
      peer.addTrack(track, localStream.current);
    });

    peer.onicecandidate = (event) => {
      if (event.candidate && remoteSocketId.current) {
        socket.emit("voice:ice-candidate", {
          toSocketId: remoteSocketId.current,
          candidate: event.candidate,
        });
      }
    };

    // 🔥 ADD: Listen for remote audio
    peer.ontrack = (event) => {
      console.log("📡 Received remote audio track");
      const remoteAudio = new Audio();
      remoteAudio.srcObject = event.streams[0];
      remoteAudio.play().catch(err => console.error("Audio play error:", err));
    };

    peerRef.current = peer;
  };

  // ---------------- CALLER → OFFER ----------------
  const startCall = async () => {
    createPeer();

    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);

    socket.emit("voice:offer", {
      toUserId: calleeId,
      offer,
      callerId,
    });

    console.log("📞 Call initiated to:", calleeId);
  };

  // ---------------- RECEIVER → OFFER HANDLER ----------------
  const handleOffer = async (offer, callerSocketId) => {
    remoteSocketId.current = callerSocketId;

    createPeer();
    await peerRef.current.setRemoteDescription(offer);

    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(answer);

    socket.emit("voice:answer", {
      toSocketId: callerSocketId,
      answer,
    });

    setCallStarted(true);
    console.log("✅ Answer sent to caller");
  };

  // ---------------- MICROPHONE ----------------
  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        localStream.current = stream;
        console.log("🎤 Microphone access granted");

        // Now call the functions after they're defined
        if (isCaller) {
          startCall();
        } else if (incomingOffer) {
          handleOffer(incomingOffer, incomingCallerSocketId);
        }
      } catch (err) {
        console.error("Microphone error:", err);
        alert("Microphone access denied.");
        onClose();
      }
    };

    startMedia();
  }, []);

  // ---------------- CALLER → ANSWER RECEIVED ----------------
  useEffect(() => {
    const onAnswer = async ({ answer, fromSocketId }) => {
      console.log("📞 Received answer from:", fromSocketId);
      remoteSocketId.current = fromSocketId;
      await peerRef.current.setRemoteDescription(answer);
      setCallStarted(true);
    };

    socket.on("voice:answer", onAnswer);
    return () => socket.off("voice:answer", onAnswer);
  }, []);

  // ---------------- ICE CANDIDATES ----------------
  useEffect(() => {
    const onICE = async (candidate) => {
      if (candidate && peerRef.current) {
        console.log("🧊 Adding ICE candidate");
        await peerRef.current.addIceCandidate(candidate);
      }
    };

    socket.on("voice:ice-candidate", onICE);
    return () => socket.off("voice:ice-candidate", onICE);
  }, []);

  // ---------------- END CALL ----------------
  const endCall = () => {
    console.log("📴 Ending call");
    if (remoteSocketId.current) {
      socket.emit("voice:end", { toSocketId: remoteSocketId.current });
    }

    peerRef.current?.close();
    localStream.current?.getTracks().forEach((t) => t.stop());
    onClose();
  };

  useEffect(() => {
    const onEnd = () => {
      console.log("📴 Call ended by remote");
      peerRef.current?.close();
      localStream.current?.getTracks().forEach((t) => t.stop());
      onClose();
    };

    socket.on("voice:end", onEnd);
    return () => socket.off("voice:end", onEnd);
  }, []);

  // ---------------- MUTE ----------------
  const toggleMic = () => {
    const newMicState = !micOn;
    setMicOn(newMicState);
    localStream.current?.getAudioTracks().forEach((t) => {
      t.enabled = newMicState;
    });
    console.log("🎤 Mic:", newMicState ? "ON" : "OFF");
  };

  // ---------------- UI ----------------
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="w-[350px] bg-gray-900 text-white rounded-2xl p-8 text-center relative">
        {/* Close */}
        <button
          onClick={endCall}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X size={22} />
        </button>

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto flex items-center justify-center overflow-hidden">
          {callerAvatar ? (
            <img src={callerAvatar} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-semibold">
              {callerName?.charAt(0) || "U"}
            </span>
          )}
        </div>

        <h2 className="mt-4 text-xl font-semibold">
          {callerName || "Voice Call"}
        </h2>

        <p className="text-white/60 mt-1">
          {callStarted ? formatTime(timer) : "Ringing…"}
        </p>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            className={`p-4 rounded-full ${
              micOn ? "bg-white/20" : "bg-red-600"
            }`}
            onClick={toggleMic}
          >
            {micOn ? <Mic size={22} /> : <MicOff size={22} />}
          </button>

          <button
            className="p-4 rounded-full bg-red-600 hover:bg-red-700"
            onClick={endCall}
          >
            <Phone size={22} className="rotate-135" />
          </button>
        </div>
      </div>
    </div>
  );
}