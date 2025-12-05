import { X, Mic, MicOff, Video, VideoOff, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

/**
 Props:
  - onClose()
  - isCaller: boolean
  - callerId (userId of caller)
  - calleeId (userId of callee, used when caller initiates)
  - callerSocketId (string) - when callee receives offer, server sends callerSocketId
  - offer (RTCSessionDescriptionInit) - when callee receives an offer
*/
export default function VideoCallModal({
  onClose,
  isCaller = false,
  callerId,
  calleeId,
  callerSocketId,
  offer, // only for callee
}) {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peerRef = useRef(null);
  const localStream = useRef(null);
  const remoteSocketIdRef = useRef(null); // tracks remote socket to send ICE/answer

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [mediaReady, setMediaReady] = useState(false);

  // Acquire media once on mount
  useEffect(() => {
    let mounted = true;

    const getMedia = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (!mounted) {
          // stop if unmounted
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        localStream.current = s;
        if (localVideo.current) localVideo.current.srcObject = s;
        setMediaReady(true);
      } catch (err) {
        console.error("Media error:", err);
        alert("Camera/microphone access is required for calls.");
        onClose?.();
      }
    };

    getMedia();
    return () => {
      mounted = false;
    };
  }, []);

  // Create RTCPeerConnection and hook tracks/events
  const createPeer = () => {
    if (!localStream.current) {
      throw new Error("Local stream not ready");
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });

    // add local tracks
    localStream.current
      .getTracks()
      .forEach((track) => pc.addTrack(track, localStream.current));

    // on remote track
    pc.ontrack = (ev) => {
      if (remoteVideo.current) remoteVideo.current.srcObject = ev.streams[0];
    };

    // ICE candidate handling
    pc.onicecandidate = (ev) => {
      if (ev.candidate && remoteSocketIdRef.current) {
        socket.emit("call:ice-candidate", {
          toSocketId: remoteSocketIdRef.current,
          candidate: ev.candidate,
        });
      }
    };

    peerRef.current = pc;
    return pc;
  };

  // Caller flow: create offer and emit to callee
  const startAsCaller = async () => {
    if (!mediaReady) {
      console.log("Media not ready — waiting...");
      return;
    }
    try {
      createPeer();
      const offerDesc = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offerDesc);

      // tell server to forward the offer to callee's socket
      socket.emit("call:offer", {
        toUserId: calleeId,
        offer: offerDesc,
        callerId,
      });
      console.log("Offer emitted to server (caller)");
    } catch (err) {
      console.error("startAsCaller error", err);
    }
  };

  // Callee flow for an incoming offer (we were given `offer` and callerSocketId props)
  const handleIncomingOffer = async (incomingOffer, incomingCallerSocketId) => {
    try {
      if (!mediaReady) {
        // wait until mediaReady becomes true, then call this again
        return;
      }

      remoteSocketIdRef.current = incomingCallerSocketId;

      createPeer();

      await peerRef.current.setRemoteDescription(incomingOffer);

      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);

      // send answer back to caller's socket id
      socket.emit("call:answer", {
        toSocketId: incomingCallerSocketId,
        answer,
      });
      console.log("Callee: answer emitted");
    } catch (err) {
      console.error("handleIncomingOffer error", err);
    }
  };

  // When media is ready, if caller => start the call
  useEffect(() => {
    if (mediaReady && isCaller) {
      // caller starts call (calleeId must be provided)
      startAsCaller();
    }

    // If media ready and we're callee and we already have an `offer` prop,
    // process it now (this happens when ChatBox opens VideoCallModal after accept)
    if (mediaReady && !isCaller && offer && callerSocketId) {
      handleIncomingOffer(offer, callerSocketId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaReady]);

  // Global: caller receives answer
  useEffect(() => {
    const onAnswer = async ({ answer }) => {
      try {
        if (peerRef.current && answer) {
          await peerRef.current.setRemoteDescription(answer);
        }
      } catch (err) {
        console.error("Error setting remote desc on answer:", err);
      }
    };

    socket.on("call:answer", onAnswer);
    return () => socket.off("call:answer", onAnswer);
  }, []);

  // ICE candidate handler from other peer
  useEffect(() => {
    const onIce = async (candidate) => {
      try {
        if (candidate && peerRef.current) {
          await peerRef.current.addIceCandidate(candidate);
        }
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    };

    socket.on("call:ice-candidate", onIce);
    return () => socket.off("call:ice-candidate", onIce);
  }, []);

  // If remote ends call
  useEffect(() => {
    const onCallEnd = () => {
      peerRef.current?.close();
      localStream.current?.getTracks().forEach((t) => t.stop());
      onClose?.();
    };

    socket.on("call:end", onCallEnd);
    return () => socket.off("call:end", onCallEnd);
  }, [onClose]);

  const endCall = () => {
    // notify remote socket if known
    if (remoteSocketIdRef.current) {
      socket.emit("call:end", { toSocketId: remoteSocketIdRef.current });
    } else {
      // fallback: emit generic end that server can route
      socket.emit("call:end", {});
    }

    peerRef.current?.close();
    localStream.current?.getTracks().forEach((t) => t.stop());
    onClose?.();
  };

  // toggles
  const toggleMic = () => {
    setMicOn((prev) => !prev);
    localStream.current?.getAudioTracks().forEach((t) => (t.enabled = !micOn));
  };

  const toggleCam = () => {
    setCamOn((prev) => !prev);
    localStream.current?.getVideoTracks().forEach((t) => (t.enabled = !camOn));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-[80%] h-[70%] bg-gray-800 rounded-xl relative">
          <video
            ref={remoteVideo}
            autoPlay
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <video
            ref={localVideo}
            autoPlay
            muted
            playsInline
            className="absolute bottom-4 right-4 w-32 rounded-lg border-2 border-white"
          />
        </div>

        <button
          onClick={endCall}
          className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <X size={22} />
        </button>

        <div className="absolute bottom-10 flex gap-6">
          <button
            className={`p-4 rounded-full ${
              micOn ? "bg-white/20" : "bg-red-600"
            }`}
            onClick={toggleMic}
          >
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          <button
            className={`p-4 rounded-full ${
              camOn ? "bg-white/20" : "bg-red-600"
            }`}
            onClick={toggleCam}
          >
            {camOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
          <button
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition"
            onClick={endCall}
          >
            <Phone size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
