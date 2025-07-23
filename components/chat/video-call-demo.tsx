"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Video, Users, MessageCircle, Phone } from "lucide-react";
import VideoCallButton from "./video-call-button";

interface VideoCallDemoProps {
  userIdentity: string;
  userName: string;
}

export default function VideoCallDemo({ userIdentity, userName }: VideoCallDemoProps) {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const demoRooms = [
    {
      id: "demo-room-1",
      name: "Demo Room 1",
      description: "Test video calling with a friend",
      participants: 1
    },
    {
      id: "demo-room-2", 
      name: "Demo Room 2",
      description: "Join a sample video conference",
      participants: 0
    },
    {
      id: "demo-room-3",
      name: "Demo Room 3", 
      description: "Practice your video call setup",
      participants: 2
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 border border-white/20 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
          <Video className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Video Call Feature</h3>
          <p className="text-white/60">Test the LiveKit integration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {demoRooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedDemo === room.id
                ? 'bg-orange-400/20 border-orange-400/50'
                : 'bg-black/30 border-white/20 hover:border-white/40'
            }`}
            onClick={() => setSelectedDemo(room.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">{room.name}</h4>
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <Users className="w-4 h-4" />
                <span>{room.participants}</span>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">{room.description}</p>
            
            <div className="flex items-center gap-2">
              <VideoCallButton
                roomName={room.id}
                userIdentity={userIdentity}
                userName={userName}
                variant="video"
                size="sm"
              />
              <VideoCallButton
                roomName={room.id}
                userIdentity={userIdentity}
                userName={userName}
                variant="audio"
                size="sm"
              />
              <span className="text-white/40 text-xs ml-2">Click to join</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-black/30 border border-white/10 rounded-xl p-4">
        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-orange-400" />
          How it works
        </h4>
        <ul className="text-white/60 text-sm space-y-1">
          <li>• Click the video or audio button to start a call</li>
          <li>• Share the room name with others to join</li>
          <li>• Built with LiveKit for high-quality video/audio</li>
          <li>• Integrated with your existing chat system</li>
        </ul>
      </div>
    </motion.div>
  );
}