"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Video, Phone } from "lucide-react";
import VideoCallModal from "./video-call-modal";

interface VideoCallButtonProps {
  roomName: string;
  userIdentity: string;
  userName: string;
  variant?: "video" | "audio";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function VideoCallButton({
  roomName,
  userIdentity,
  userName,
  variant = "video",
  size = "md",
  className = ""
}: VideoCallButtonProps) {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  const sizeClasses = {
    sm: "p-2 w-8 h-8",
    md: "p-3 w-10 h-10",
    lg: "p-4 w-12 h-12"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const handleStartCall = () => {
    setIsVideoCallOpen(true);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartCall}
        className={`
          ${sizeClasses[size]} 
          ${variant === "video" 
            ? "bg-green-500 hover:bg-green-600" 
            : "bg-blue-500 hover:bg-blue-600"
          } 
          text-white rounded-full transition-colors shadow-lg hover:shadow-xl
          ${className}
        `}
        title={variant === "video" ? "Start video call" : "Start audio call"}
      >
        {variant === "video" ? (
          <Video className={iconSizes[size]} />
        ) : (
          <Phone className={iconSizes[size]} />
        )}
      </motion.button>

      {isVideoCallOpen && (
        <VideoCallModal
          isOpen={isVideoCallOpen}
          onClose={() => setIsVideoCallOpen(false)}
          roomName={roomName}
          userIdentity={userIdentity}
          userName={userName}
        />
      )}
    </>
  );
}