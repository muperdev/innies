"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { X, PhoneOff, Maximize, Minimize, Users } from "lucide-react";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
  userIdentity: string;
  userName: string;
}

function VideoCallModal({
  isOpen,
  onClose,
  roomName,
  userIdentity,
  userName,
}: VideoCallModalProps) {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionState, setConnectionState] = useState<string>("connecting");

  const fetchToken = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        `/api/video-call/token?room=${encodeURIComponent(roomName)}&username=${encodeURIComponent(userIdentity)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setToken(data.token);
    } catch (err) {
      console.error("Error fetching token:", err);
      setError(
        err instanceof Error ? err.message : "Failed to get video call token"
      );
    } finally {
      setIsLoading(false);
    }
  }, [roomName, userIdentity]);

  useEffect(() => {
    if (isOpen && userIdentity && roomName) {
      fetchToken();
    }
  }, [isOpen, userIdentity, roomName, fetchToken]);

  const handleClose = () => {
    setToken("");
    setError("");
    setIsLoading(true);
    setConnectionState("connecting");
    onClose();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20 ${
            isFullscreen
              ? "w-full h-full rounded-none"
              : "w-[90vw] h-[80vh] max-w-6xl"
          }`}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <h3 className="text-white font-medium">{userName}</h3>
                  <p className="text-white/60 text-sm capitalize">
                    {connectionState}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullscreen}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize className="w-4 h-4" />
                  ) : (
                    <Maximize className="w-4 h-4" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full h-full">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-white text-lg font-medium mb-2">
                    Connecting to call...
                  </h3>
                  <p className="text-white/60">
                    Setting up your video connection
                  </p>
                </motion.div>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center max-w-md mx-auto p-6"
                >
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PhoneOff className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">
                    Connection Failed
                  </h3>
                  <p className="text-white/60 mb-4">{error}</p>
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={fetchToken}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      Try Again
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            )}

            {token && !error && (
              <LiveKitRoom
                video={true}
                audio={true}
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                data-lk-theme="default"
                style={{ height: "100%" }}
                onConnected={() => setConnectionState("connected")}
                onDisconnected={() => setConnectionState("disconnected")}
                onError={(error) => {
                  console.error("LiveKit error:", error);
                  setError("Connection error occurred");
                }}
              >
                <VideoConference
                  chatMessageFormatter={(message: string) => message}
                />
                <RoomAudioRenderer />
              </LiveKitRoom>
            )}
          </div>

          {/* Custom Controls Overlay */}
          {token && !error && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/60 backdrop-blur-sm rounded-2xl p-2 flex items-center gap-2"
              >
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-white text-xs font-medium px-2">
                    LIVE
                  </span>
                </div>

                <div className="w-px h-6 bg-white/20" />

                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-xs">
                    Room: {roomName}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default VideoCallModal;
